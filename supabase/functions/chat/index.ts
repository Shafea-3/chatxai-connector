import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    console.log('Received message:', message)

    const apiKey = Deno.env.get('api-xai')
    if (!apiKey) {
      throw new Error('XAI API key not found in environment variables (api-xai)')
    }
    console.log('API Key configured:', !!apiKey)

    const url = 'https://api.xai.cx/v1/chat/completions'
    console.log('Making request to:', url)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
          model: 'gpt-4o'
        })
      })

      console.log('XAI API Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('XAI API error response:', errorText)
        throw new Error(`XAI API error: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log('XAI API success response:', data)

      if (!data.choices?.[0]?.message?.content) {
        console.error('Invalid response format:', data)
        throw new Error('Invalid response format from XAI API')
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch (fetchError) {
      console.error('Fetch error details:', {
        message: fetchError.message,
        cause: fetchError.cause,
        stack: fetchError.stack
      })
      throw fetchError
    }
  } catch (error) {
    console.error('Error in chat function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})