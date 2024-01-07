import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent {

  @ViewChildren('msgRef') messages: QueryList<ElementRef> | undefined;
  
  apiKey: string | undefined;
  title = 'Angular GPT Chatbot';
  inputText: any;
  responseText: any;
  messageHistory: { role: string; content: string }[] = [];
  useGPT4: string | boolean | undefined;
  currentGPT: string | undefined;

  ngOnInit() {
    const isgpt4 = localStorage.getItem('UseGPT4');
    if (isgpt4 === 'true') {
      this.currentGPT = 'GPT-4-Turbo';
    } else {
      this.currentGPT = 'GPT-3.5-Turbo';
    }

    const savedMessages = localStorage.getItem('messageHistory');
    if (savedMessages) {
      this.messageHistory = JSON.parse(savedMessages);
    }
  }

  fetchChat = async () => {
    this.useGPT4 = localStorage.getItem('UseGPT4') ?? false;

    let model = 'gpt-3.5-turbo';
    if (this.useGPT4 === 'true') {
      model = 'gpt-4-1106-preview';
    }
    const userMessage = {
      role: 'user',
      content: this.inputText,
    };
    this.messageHistory.push(userMessage);
    this.apiKey = localStorage.getItem('apikey') ?? undefined;
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.apiKey,
      },
      body: JSON.stringify({
        model: model,
        messages: this.messageHistory,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.choices && json.choices.length > 0) {
          this.responseText = json.choices[0].message.content;
          this.messageHistory.push({
            role: 'assistant',
            content: this.responseText,
          });
          localStorage.setItem(
            'messageHistory',
            JSON.stringify(this.messageHistory)
          );
        } else {
          console.error('No choices in response', json);
        }
        console.log(json);
      })
      .catch((err) => console.log(err));
    this.inputText = ''; // Clear the input
  };
  clearChat() {
    this.messageHistory = [];
    localStorage.removeItem('messageHistory');
  }
  ngAfterViewInit() {
    if (this.messages) {
      this.messages.changes.subscribe(elements => {
        this.scrollToBottom();
      });
    }
  }

  scrollToBottom() {
    if (this.messages && this.messages.length > 0) {
      const lastMessage = this.messages.last.nativeElement;
      lastMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
