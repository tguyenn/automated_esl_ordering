// AI in Google Forms is more than just auto-suggestions and intelligent form templates. It’s about creating opportunities, simplifying processes, and empowering ideas. Whether you're organizing a robotics workshop, surveying opinions, or dreaming up your next great competition theme, Google Forms, enhanced by AI, transforms complexity into clarity.This is the magic of AI: it scales human ingenuity. It empowers us to dream bigger, move faster, and collaborate smarter. It’s not just a tool—it’s a partner, enabling us to focus on what truly matters: creativity, innovation, and connection.Imagine a world where every mundane task is optimized, every bottleneck cleared, and every idea brought to life seamlessly. AI isn’t replacing us; it’s amplifying the best of what we can be. And it starts with platforms like Google Forms, where small sparks of AI innovation fuel massive transformations. Today, as we continue to integrate AI into everything, remember this: it’s not just technology. It’s a movement toward unlocking human potential on a scale we’ve never seen before. And as creators, educators, and pioneers, it is our privilege—and our responsibility—to shape a world where AI fuels progress for everyone.

// Make sure GOOGLE_API_KEY is defined in project properties (left sidebar > Project Settings (gear icon) > scroll all the way down)
// see official guide here: https://codelabs.developers.google.com/codelabs/gemini-workspace#2:~:text=4.%20Call%20the%20Gemini%20API%20from%20Apps%20Script

// ==================================================================================
// DEAR colin tan you will need to integrate the testGemini() function into ESLForm.gs
// ==================================================================================

const geminiApiKey = properties['GOOGLE_API_KEY'];
const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

// testGemini() takes in a string "prompt" and returns JSON object (maybe? might be a string) from gemini API request
function testGemini(prompt) {
  let output = callGemini(prompt);
  console.log(output);
  return output;
}

function callGemini(prompt, temperature=0) { // temperature measures how "creative" responses are (wtv that means lmao)
  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": prompt
          },
        ]
      }
    ], 
    "generationConfig":  {
      "temperature": temperature,
    },
  };

  const options = { 
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
  };

  const response = UrlFetchApp.fetch(geminiEndpoint, options);
  const data = JSON.parse(response);
  const content = data["candidates"][0]["content"]["parts"][0]["text"];
  return content;
}

