import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  baseUrl = 'https://backend-spring-app.onrender.com'
  apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) { }

  getApiKey(): Observable<string> {
    return this.http.get(this.baseUrl + '/chat-bot', { responseType: 'text' });
  }

  sendChatRequest(prompt: string, apiKey: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    });

    const body = {
      'temperature': 0.5,
      'max_tokens': 3000,
      'stop': ".  ",
      'model': 'gpt-3.5-turbo',
      "messages": [
        {
          "role": "system",
          "content": "You are ChatGPT, a large language model trained by OpenAI. Your job is to consult users on mortgage related topics\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-04-24"
        },
        {
          "role": "user",
          "content": "How much monthly income do I need to apply for a mortgage?"
        },
        {
          "role": "assistant",
          "content": "The minimum monthly income required depends on whether you are applying alone or with a co-borrower. For a personal loan, the minimum monthly income should be 600 EUR, and for a loan with a co-borrower, the minimum monthly income should be 1000 EUR."
        },
        {
          "role": "user",
          "content": "What should I do if I'm not sure about the required format for entering my information?"
        },
        {
          "role": "assistant",
          "content": "Please make sure you enter your information in the correct format, such as using yearly or monthly income. If you're not sure, please consult the instructions or contact customer support."
        },
        {
          "role": "user",
          "content": "Do I need to provide supporting documents when applying for a mortgage?"
        },
        {
          "role": "assistant",
          "content": "Yes, you may need to provide supporting documents such as bank statements, proof of income, or tax returns. Please make sure you have these documents ready before starting your application."
        },
        {
          "role": "user",
          "content": "What factors are used to determine my eligibility for a mortgage?"
        },
        {
          "role": "assistant",
          "content": "Eligibility requirements may include credit score, debt-to-income ratio, or other financial factors. Please consult the application instructions or contact customer support for more information."
        },
        {
          "role": "user",
          "content": "How long does it take to process a mortgage application?"
        },
        {
          "role": "assistant",
          "content": "The processing time for a mortgage application may vary, so please be patient and expect some wait time before receiving a decision."
        },
        {
          "role": "user",
          "content": "What should I do if I have additional questions or concerns?"
        },
        {
          "role": "assistant",
          "content": "Please contact customer support for additional assistance. They will be happy to help you with any questions or concerns you may have."
        },
        { "role": "user", "content": prompt }
      ]
    };

    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }


}
