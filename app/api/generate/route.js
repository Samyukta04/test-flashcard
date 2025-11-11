import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given text.

Follow these rules strictly:
1. Create clear and focused questions for the front of each flashcard
2. Provide accurate, brief answers for the back of each flashcard
3. Ensure each flashcard focuses on a single concept
4. Use simple language for better retention
5. Create 10 flashcards

Return ONLY valid JSON in this exact format with no additional text:
{
  "flashcards": [
    {
      "front": "Question text here",
      "back": "Answer text here"
    }
  ]
}
`

export async function POST(req) {
    try {
        console.log('=== API Route Called ===')

        if (!process.env.GROQ_API_KEY) {
            console.error('Groq API key is missing')
            return NextResponse.json(
                { error: 'Groq API key is not configured' },
                { status: 500 }
            )
        }

        console.log('Groq API Key exists:', !!process.env.GROQ_API_KEY)

        const data = await req.text()
        console.log('Received text:', data.substring(0, 100))

        if (!data || data.trim() === '') {
            return NextResponse.json(
                { error: 'No text provided' },
                { status: 400 }
            )
        }

        console.log('Calling Groq API...')

        // Use regular completion instead of JSON mode for better reliability
        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                {
                    role: 'user',
                    content: `Create flashcards from this text:\n\n${data}`
                }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.3,
            max_tokens: 2000,
        })

        console.log('Got response from Groq')

        const responseText = completion.choices[0]?.message?.content

        if (!responseText) {
            throw new Error('Empty response from Groq API')
        }

        console.log('Response preview:', responseText.substring(0, 200))

        // Extract JSON from response (in case there's extra text)
        let jsonMatch = responseText.match(/\{[\s\S]*"flashcards"[\s\S]*\}/);

        if (!jsonMatch) {
            // Try to find any JSON object
            jsonMatch = responseText.match(/\{[\s\S]*\}/);
        }

        if (!jsonMatch) {
            console.error('No JSON found in response:', responseText)
            throw new Error('Could not extract JSON from response')
        }

        const jsonString = jsonMatch[0]
        console.log('Extracted JSON:', jsonString.substring(0, 200))

        const flashcards = JSON.parse(jsonString)

        if (!flashcards.flashcards || !Array.isArray(flashcards.flashcards)) {
            throw new Error('Invalid flashcard format in response')
        }

        console.log('Successfully parsed flashcards:', flashcards.flashcards.length)

        return NextResponse.json(flashcards.flashcards)

    } catch (error) {
        console.error('=== ERROR DETAILS ===')
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
        console.error('Full error:', error)

        return NextResponse.json(
            {
                error: 'Failed to generate flashcards',
                details: error.message
            },
            { status: 500 }
        )
    }
}
