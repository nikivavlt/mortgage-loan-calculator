import { Component} from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { ChatBotService } from 'src/app/services/chat-bot.service';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css']
})
export class ChatBubbleComponent {
  chatHistory: Array<string> | undefined;
  isLoading = false;
  isActive = true;
  chatInput = '';
  apiKey: string;

  constructor(private chatBotService:ChatBotService) {
    this.apiKey = "";
    this.chatHistory = ['Hello, how can I help you today?'];
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


  async sendMessage(chatInput: string): Promise<void> {
    try {
      this.isLoading = true;
      this.isActive = true;
      this.chatHistory?.push(chatInput);
      const response = await firstValueFrom(this.chatBotService.sendChatRequest(chatInput, this.apiKey));

      if (response.choices && response.choices.length > 0 && response.choices[0].message.content) {
        this.chatHistory?.push(response.choices[0].message.content);
      } else {
        this.chatHistory?.push('Sorry, I could not understand your request.');
      }
    } catch (error) {
      this.chatHistory?.push('Oops! Something went wrong.');
    } finally {
      this.isLoading = false;
      chatInput = '';
    }
  }

  onSubmit(): void {
    const message = this.chatInput.trim();
    if (message) {
      this.sendMessage(message);
    }
  }
}
