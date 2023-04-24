import { Component} from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { ChatBotService } from 'src/app/services/chat-bot.service';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css']
})
export class ChatBubbleComponent {
  message = '';
  response: Array<string> | undefined;
  isLoading = false;
  isActive = true;
  chatInput = '';
  apiKey: string;

  constructor(private chatBotService:ChatBotService) {
    this.apiKey = "";
    this.response = [];
    this.getApiKey();
  }


  async getApiKey() {
    await new Promise<void>((resolve, reject) => {
      this.chatBotService.getApiKey().pipe(
        map((result) => result as string)
      ).subscribe({
        next: (result) => {
          this.apiKey = result;
          resolve();
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }


  async sendMessage(message: string): Promise<void> {
    try {
      this.message = message;
      this.isLoading = true;
      this.isActive = true;
      const response = await firstValueFrom(this.chatBotService.sendChatRequest(this.chatInput, this.apiKey));

      if (response.choices && response.choices.length > 0 && response.choices[0].message.content) {
        console.log(response.choices[0].message.content);

        this.response?.push(response.choices[0].message.content);
      } else {
        this.response?.push('Sorry, I could not understand your request.');
      }
    } catch (error) {
      this.response?.push('Oops! Something went wrong.');
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
