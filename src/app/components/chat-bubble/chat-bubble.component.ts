import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css']
})
export class ChatBubbleComponent {
  message = 'I am a little broken and need context configuration ask me anything like 2+2!';
  apiKey = String;
  isLoading = false;
  isActive = true;
  chatInput = '';
  apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {
    console.log("test");

    this.getApiKey();
  }

  getApiKey(){
    this.http.get('/etc/secrets/API_KEY').subscribe({
      next: (response) => {
        try {
          console.log(response);

        } catch (error) {
          console.error(error);
        } finally {
          // any additional code to execute after the try/catch block
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
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



  async sendMessage(message: string): Promise<void> {
    try {
      this.message = message;
      this.isLoading = true;
      this.isActive = true;
      const response = await firstValueFrom(this.sendChatRequest(this.chatInput, "this.apiKey"));

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
