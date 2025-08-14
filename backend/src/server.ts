import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// AI Agent Configuration
const AI_AGENT_BASE_URL = process.env.AI_AGENT_BASE_URL || 'http://localhost:8096';
const AI_AGENT_ENDPOINT = process.env.AI_AGENT_ENDPOINT || '/ask/stream';

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// STREAMING AI CHAT ENDPOINT
// ============================================================================

app.post('/api/v1/chat/stream', async (req: Request, res: Response) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Streaming chat request:', { message, context });

    // Set up Server-Sent Events headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    });

    // Transform the user message for your AI agent
    const aiPayload = {
      question: message,
      context: context || {},
      stream: true
    };

    try {
      // Make streaming request to your AI agent
      const aiResponse = await axios({
        method: 'POST',
        url: `${AI_AGENT_BASE_URL}${AI_AGENT_ENDPOINT}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        data: aiPayload,
        responseType: 'stream',
        timeout: 30000
      });

      let accumulatedResponse = '';
      
      // Forward the streaming response
      aiResponse.data.on('data', (chunk: Buffer) => {
        const chunkStr = chunk.toString();
        const lines = chunkStr.split('\n');
        
        for (const line of lines) {
          if (line.trim() && line.startsWith('data: ')) {
            try {
              const data = line.substring(6).trim();
              if (data === '[DONE]') {
                // Send final context extraction
                const extractedContext = extractContextFromResponse(accumulatedResponse);
                res.write(`data: ${JSON.stringify({
                  type: 'context',
                  data: extractedContext
                })}\n\n`);
                res.write('data: [DONE]\n\n');
                res.end();
                return;
              }
              
              const parsedData = JSON.parse(data);
              accumulatedResponse += parsedData.content || parsedData.text || '';
              
              // Forward the chunk to frontend
              res.write(`data: ${JSON.stringify({
                type: 'content',
                data: parsedData.content || parsedData.text || data
              })}\n\n`);
            } catch (parseError) {
              console.error('Error parsing chunk:', parseError);
              // Forward raw data if parsing fails
              res.write(`data: ${JSON.stringify({
                type: 'content',
                data: line.substring(6).trim()
              })}\n\n`);
            }
          }
        }
      });

      aiResponse.data.on('end', () => {
        if (!res.headersSent) {
          res.write('data: [DONE]\n\n');
          res.end();
        }
      });

      aiResponse.data.on('error', (error: any) => {
        console.error('AI Agent stream error:', error);
        res.write(`data: ${JSON.stringify({
          type: 'error',
          data: 'Stream error occurred'
        })}\n\n`);
        res.end();
      });

    } catch (aiError: any) {
      console.error('AI Agent request error:', aiError.message);
      
      // Use local catalog search if external AI is not available
      const catalogResponse = generateTechnologyResponse(message, context);
      res.write(`data: ${JSON.stringify({
        type: 'content',
        data: catalogResponse
      })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    }

  } catch (error: any) {
    console.error('Chat stream error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// ============================================================================
// NON-STREAMING CHAT ENDPOINT (FALLBACK)
// ============================================================================

app.post('/api/v1/chat', async (req: Request, res: Response) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Chat request:', { message, context });

    try {
      // Try non-streaming endpoint first
      const aiResponse = await axios({
        method: 'POST',
        url: `${AI_AGENT_BASE_URL}/ask`, // Non-streaming endpoint
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          question: message,
          context: context || {}
        },
        timeout: 15000
      });

      const response = aiResponse.data.answer || aiResponse.data.response || aiResponse.data;
      const extractedContext = extractContextFromResponse(response);

      res.json({
        message: response,
        context: extractedContext,
        nextStep: determineNextStep(extractedContext),
        recommendations: generateRecommendations(extractedContext)
      });

    } catch (aiError: any) {
      console.error('AI Agent error:', aiError.message);
      
      // Use local catalog search
      const catalogResponse = generateTechnologyResponse(message, context);
      const extractedContext = extractContextFromResponse(catalogResponse);

      res.json({
        message: catalogResponse,
        context: extractedContext,
        nextStep: determineNextStep(extractedContext),
        recommendations: generateRecommendations(extractedContext)
      });
    }

  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function extractContextFromResponse(response: string): any {
  const context: any = {};
  const lowerResponse = response.toLowerCase();

  // Extract sectors
  if (lowerResponse.includes('cti')) context.sector = 'CTI';
  else if (lowerResponse.includes('icg')) context.sector = 'ICG';
  else if (lowerResponse.includes('pbwm')) context.sector = 'PBWM';
  else if (lowerResponse.includes('gfts')) context.sector = 'GFTS';

  // Extract use cases
  if (lowerResponse.includes('migrate') || lowerResponse.includes('migration')) {
    context.useCase = 'Platform Migration';
  } else if (lowerResponse.includes('container')) {
    context.useCase = 'Containerization';
  } else if (lowerResponse.includes('cloud-native') || lowerResponse.includes('microservices')) {
    context.useCase = 'Cloud-Native Development';
  } else if (lowerResponse.includes('test')) {
    context.useCase = 'Testing Environment';
  } else if (lowerResponse.includes('ai') || lowerResponse.includes('machine learning')) {
    context.useCase = 'AI/ML Integration';
  }

  // Extract priority based on keywords
  if (lowerResponse.includes('urgent') || lowerResponse.includes('critical')) {
    context.priority = 'Critical';
  } else if (lowerResponse.includes('important') || lowerResponse.includes('high priority')) {
    context.priority = 'High';
  }

  return context;
}

function determineNextStep(context: any): number {
  const contextKeys = Object.keys(context).filter(key => context[key]);
  
  if (contextKeys.length === 0) return 1;
  if (contextKeys.length <= 2) return 2;
  if (contextKeys.length <= 3) return 3;
  return 4;
}

function generateRecommendations(context: any): any[] {
  const recommendations = [];

  if (context.useCase === 'Platform Migration') {
    recommendations.push({
      id: 'ecs',
      solution: 'ECS',
      confidence: 95,
      reasoning: 'ECS is our enterprise-grade OpenShift platform, perfect for PCF migrations with proven success rates.',
      recommended: true
    });
    recommendations.push({
      id: 'dolly',
      solution: 'Dolly',
      confidence: 90,
      reasoning: 'Dolly automates PCF to ECS migrations with minimal code changes and comprehensive rollback capabilities.'
    });
  } else if (context.useCase === 'Containerization') {
    recommendations.push({
      id: 'andromeda',
      solution: 'Cloud@cx: Andromeda',
      confidence: 88,
      reasoning: 'Andromeda provides cost-effective containerization with usage-based pricing and enterprise security.'
    });
  } else if (context.useCase === 'AI/ML Integration') {
    recommendations.push({
      id: 'innovation-lab',
      solution: 'Innovation Lab',
      confidence: 85,
      reasoning: 'Innovation Lab offers rapid prototyping capabilities for AI/ML experimentation and development.'
    });
  }

  return recommendations;
}

function generateTechnologyResponse(message: string, context: any): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('migrate') && lowerMessage.includes('pcf')) {
    return "For PCF migration, I found these proven solutions in our catalog: **ECS** (Enterprise Container Service) for production-grade workloads, and **Dolly** migration tool for automated, low-risk migration with rollback capabilities. Both have established success records for enterprise migrations with minimal downtime.";
  } else if (lowerMessage.includes('container')) {
    return "For containerization, our catalog includes: **Cloud@cx Andromeda** for cost-effective container deployment, **ECS** for enterprise-grade Kubernetes, and comprehensive containerization patterns. These solutions provide security compliance and operational excellence for modern application architecture.";
  } else if (lowerMessage.includes('cloud') || lowerMessage.includes('microservices')) {
    return "For cloud-native development, I recommend: **Innovation Lab** for rapid prototyping, **ECS** for microservices deployment, and our cloud-native development patterns. These enable modern architectures with proper service mesh, API gateways, and comprehensive observability.";
  } else if (lowerMessage.includes('test')) {
    return "For testing environments, our catalog offers comprehensive testing platforms with automated testing capabilities, CI/CD integration, and quality assurance tools designed for enterprise workflows and seamless development integration.";
  } else if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning')) {
    return "For AI/ML integration, **Innovation Lab** provides rapid prototyping capabilities and experimentation environments. Our catalog includes platforms for data processing, model development, and AI application deployment with enterprise security features.";
  }

  return "Based on your query, I'm searching our technology catalog to find the best solutions. Please be more specific about your technology needs (e.g., 'PCF migration', 'containerization', 'cloud-native development') for better recommendations.";
}

// ============================================================================
// HEALTH CHECK ENDPOINTS
// ============================================================================

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    aiAgent: {
      url: AI_AGENT_BASE_URL,
      endpoint: AI_AGENT_ENDPOINT,
      configured: !!AI_AGENT_BASE_URL
    }
  });
});

app.get('/api/v1/health/ai-agent', async (req: Request, res: Response) => {
  try {
    const healthCheck = await axios.get(`${AI_AGENT_BASE_URL}/health`, { timeout: 5000 });
    res.json({
      status: 'connected',
      aiAgentHealth: healthCheck.data,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(503).json({
      status: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Tech Explorer API - Technology Catalog & Discovery',
    version: '1.0.0',
    status: 'running',
    capabilities: {
      catalogSearch: true,
      technologyMatching: true,
      externalAI: !!AI_AGENT_BASE_URL
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🤖 AI Agent configured: ${AI_AGENT_BASE_URL}${AI_AGENT_ENDPOINT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;