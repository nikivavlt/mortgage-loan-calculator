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
      'stop': " ",
      'model': 'gpt-3.5-turbo',
      "messages": [
        {"role": "system", "content": "You are a mortgage calculator application assistant."},
        {"role": "user", "content": prompt}
      ]
    };

    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }


}
