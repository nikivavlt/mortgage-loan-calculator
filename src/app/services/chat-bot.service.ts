import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  baseUrl = 'https://backend-spring-app.onrender.com'
  apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient ) { }

  getApiKey(): Observable<string> {
    return this.http.get(this.baseUrl+'/chatBot/getApiKey', { responseType: 'text' });
  }

  sendChatRequest(prompt: string, apiKey: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    });

    const body = {
      'temperature': 0.5,
      'max_tokens': 60,
      'stop': ".",
      'model': 'gpt-3.5-turbo',
      "messages":
      [
        {"role": "system", "content" : "You are ChatGPT, a large language model trained by OpenAI. Your job is to consult users on mortgage related topics\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-03-02"},
        {"role": "user", "content" : "How are you?"},
        {"role": "assistant", "content" : "I am doing well"},
        {"role": "user", "content" : "I would like to apply for a mortgage."},
        {"role": "assistant", "content" : "Great! Before we begin, here are some context messages to assist you with filling out the mortgage form:"},
        {"role": "assistant", "content" : "- Please ensure you complete all required fields on the form.\n- Make sure you enter your information in the correct format, such as using yearly or monthly income.\n- You may need to provide supporting documents such as bank statements, proof of income, or tax returns.\n- Eligibility requirements may include credit score, debt-to-income ratio, or other financial factors.\n- The processing time for a mortgage application may vary, so please be patient and expect some wait time before receiving a decision."},
        {"role": "assistant", "content" : "Do you have any further questions before we begin?"},
        {"role": "user",  "content" : prompt}
      ]
    };

    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }


}
