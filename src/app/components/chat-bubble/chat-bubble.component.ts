import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css']
})
export class ChatBubbleComponent {
  message = 'I am a little broken and need context configuration ask me anything like 2+2!';
  isLoading = false;
  isActive = true;
  chatInput = '';

  constructor(private http: HttpClient) {}

  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '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';

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

  async sendMessage(message: string): Promise<void> {
    try {
      this.message = message;
      this.isLoading = true;
      this.isActive = true;
      const response = await firstValueFrom(this.sendChatRequest(this.chatInput, this.apiKey));

      if (response.choices && response.choices.length > 0 && response.choices[0].message.content) {
        this.message = response.choices[0].message.content;
      } else {
        this.message = 'Sorry, I could not understand your request.';
      }
    } catch (error) {
      console.error(error);
      this.message = 'Oops! Something went wrong.';
    } finally {
      this.isLoading = false;
      this.chatInput = '';
    }
  }

  onSubmit(): void {
    const message = this.chatInput.trim();
    if (message) {
      this.sendMessage(message);
    }
  }
}
