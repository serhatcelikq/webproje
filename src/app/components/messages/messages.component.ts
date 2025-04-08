import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../services/theme.service';
import { ActivatedRoute } from '@angular/router';

// Örnek kullanıcılar ve konuşmalar
const sampleConversations = [
  {
    id: '1',
    name: 'Ahmet Satıcı',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    car: {
      id: '1',
      make: 'Toyota',
      model: 'Corolla',
      year: 2019,
      price: '225.000 TL',
      image:
        'https://images.unsplash.com/photo-1626072778346-0ab6604d39c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    lastMessage: 'Aracın km bilgisini öğrenebilir miyim?',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 saat önce
    unread: 2,
  },
  {
    id: '2',
    name: 'Mehmet Galeri',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    car: {
      id: '3',
      make: 'Volkswagen',
      model: 'Passat',
      year: 2020,
      price: '375.000 TL',
      image:
        'https://images.unsplash.com/photo-1632038229229-06c76eba7982?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    lastMessage: 'İyi günler, satış fiyatında pazarlık payı var mı?',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 gün önce
    unread: 0,
  },
  {
    id: '3',
    name: 'Ayşe Motors',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    car: {
      id: '5',
      make: 'BMW',
      model: 'X5',
      year: 2021,
      price: '750.000 TL',
      image:
        'https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    lastMessage: 'Hafta sonu test sürüşü için müsait misiniz?',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 gün önce
    unread: 1,
  },
];

// Her kullanıcı için örnek mesajlaşma geçmişi
const sampleMessageHistory: { [key: string]: any[] } = {
  '1': [
    {
      id: '101',
      text: 'Merhaba, Toyota Corolla aracınız hakkında bilgi almak istiyorum.',
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 saat önce
      isMine: true,
    },
    {
      id: '102',
      text: 'Merhaba, tabii ki. Size nasıl yardımcı olabilirim?',
      timestamp: new Date(Date.now() - 7000000).toISOString(),
      isMine: false,
      sender: 'Ahmet Satıcı',
    },
    {
      id: '103',
      text: 'Aracın güncel kilometre durumu nedir?',
      timestamp: new Date(Date.now() - 6800000).toISOString(),
      isMine: true,
    },
    {
      id: '104',
      text: 'Araç şu anda 45.000 kilometrede ve tüm bakımları yetkili serviste yapıldı.',
      timestamp: new Date(Date.now() - 6600000).toISOString(),
      isMine: false,
      sender: 'Ahmet Satıcı',
    },
    {
      id: '105',
      text: 'Aracın km bilgisini öğrenebilir miyim?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isMine: true,
    },
  ],
  '2': [
    {
      id: '201',
      text: 'Merhaba, Volkswagen Passat aracınızla ilgileniyorum.',
      timestamp: new Date(Date.now() - 93600000).toISOString(),
      isMine: true,
    },
    {
      id: '202',
      text: 'Merhaba, hoş geldiniz. Aracımız 2020 model ve çok temiz durumda.',
      timestamp: new Date(Date.now() - 93400000).toISOString(),
      isMine: false,
      sender: 'Mehmet Galeri',
    },
    {
      id: '203',
      text: 'İyi günler, satış fiyatında pazarlık payı var mı?',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      isMine: true,
    },
  ],
  '3': [
    {
      id: '301',
      text: 'Merhaba, BMW X5 aracınızı inceledim ve çok beğendim.',
      timestamp: new Date(Date.now() - 180000000).toISOString(),
      isMine: true,
    },
    {
      id: '302',
      text: 'Merhaba, teşekkür ederim. Aracımız 2021 model ve full donanımlı.',
      timestamp: new Date(Date.now() - 179800000).toISOString(),
      isMine: false,
      sender: 'Ayşe Motors',
    },
    {
      id: '303',
      text: 'Test sürüşü yapabilir miyim?',
      timestamp: new Date(Date.now() - 179600000).toISOString(),
      isMine: true,
    },
    {
      id: '304',
      text: 'Tabii ki, istediğiniz zaman showroomumuza gelebilirsiniz.',
      timestamp: new Date(Date.now() - 179400000).toISOString(),
      isMine: false,
      sender: 'Ayşe Motors',
    },
    {
      id: '305',
      text: 'Hafta sonu test sürüşü için müsait misiniz?',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      isMine: true,
    },
    {
      id: '306',
      text: 'Evet, cumartesi 10:00-18:00 arası müsaitiz.',
      timestamp: new Date(Date.now() - 172600000).toISOString(),
      isMine: false,
      sender: 'Ayşe Motors',
    },
  ],
};

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  car: any;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMine: boolean;
  sender?: string;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  theme: Theme;
  activeConversation: Conversation | null = null;
  conversationList: Conversation[] = sampleConversations;
  message = '';
  messages: Message[] = [];

  constructor(
    private themeService: ThemeService,
    private route: ActivatedRoute
  ) {
    this.theme = this.themeService.getTheme();
  }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });

    // URL parametrelerini dinle
    this.route.queryParams.subscribe((params) => {
      // Satıcıyla iletişime geçme kontrolü
      if (params['contactSeller'] === 'true' && params['sellerId']) {
        const carMake = params['carMake'] || '';
        const carModel = params['carModel'] || '';
        const carYear = params['carYear'] || '';
        const sellerName =
          params['sellerName'] || `${carMake} ${carModel} Satıcısı`;
        const sellerId = params['sellerId'];

        // Satıcı zaten konuşma listesinde var mı kontrol et
        const existingConversation = this.conversationList.find(
          (c) => c.id === sellerId
        );

        if (existingConversation) {
          // Varolan konuşmayı seç
          this.handleConversationSelect(existingConversation);
        } else {
          // Yeni satıcı konuşması oluştur
          const newConversation: Conversation = {
            id: sellerId,
            name: sellerName,
            avatar: `https://randomuser.me/api/portraits/men/${
              Math.floor(Math.random() * 50) + 1
            }.jpg`,
            car: {
              id: sellerId,
              make: carMake,
              model: carModel,
              year: carYear,
              image:
                'https://images.unsplash.com/photo-1605816988069-b11383b50717?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
            },
            lastMessage: '',
            timestamp: new Date().toISOString(),
            unread: 0,
          };

          // Konuşma listesine ekle ve seç
          this.conversationList = [newConversation, ...this.conversationList];
          this.handleConversationSelect(newConversation);

          // Otomatik olarak bir mesaj gönder
          setTimeout(() => {
            this.message = `Merhaba, ${carYear} ${carMake} ${carModel} aracı hakkında bilgi almak istiyorum.`;
            this.sendMessage();
          }, 500);
        }
      }
    });
  }

  handleConversationSelect(conversation: Conversation): void {
    this.activeConversation = conversation;

    // Örnek mesaj geçmişi var mı kontrol et
    const messageHistory = sampleMessageHistory[conversation.id] || [];

    // Eğer mesaj geçmişi yoksa, otomatik bir hoşgeldin mesajı oluştur
    if (messageHistory.length === 0) {
      const initialMessages = [
        {
          id: '1',
          text: `Merhaba, ${conversation.car.make} ${conversation.car.model} aracı ile ilgili bilgi almak istiyorum.`,
          timestamp: new Date().toISOString(),
          isMine: true,
        },
        {
          id: '2',
          text: 'Merhaba, aracımız hakkında hangi konuda bilgi almak istersiniz?',
          timestamp: new Date(Date.now() + 1000).toISOString(),
          isMine: false,
          sender: conversation.name,
        },
      ];
      this.messages = initialMessages;
    } else {
      this.messages = messageHistory;
    }

    // Okunmamış mesajları okundu olarak işaretle
    if (conversation.unread > 0) {
      this.conversationList = this.conversationList.map((c) => {
        if (c.id === conversation.id) {
          return { ...c, unread: 0 };
        }
        return c;
      });
    }
  }

  handleBackToList(): void {
    this.activeConversation = null;
  }

  sendMessage(): void {
    if (this.message.trim() === '' || !this.activeConversation) return;

    const newMessage = {
      id: String(new Date().getTime()),
      text: this.message,
      timestamp: new Date().toISOString(),
      isMine: true,
    };

    // Mesajlar listesini güncelle
    this.messages = [...this.messages, newMessage];

    // Konuşma listesinde son mesajı güncelle
    this.conversationList = this.conversationList.map((c) => {
      if (c.id === this.activeConversation?.id) {
        return {
          ...c,
          lastMessage: this.message,
          timestamp: new Date().toISOString(),
        };
      }
      return c;
    });

    // Konuşma listesini sırala (en son mesaj en üstte)
    this.conversationList.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    this.message = '';

    // Satıcıdan otomatik yanıt
    setTimeout(() => {
      if (this.activeConversation) {
        const response = {
          id: String(new Date().getTime() + 1),
          text: 'Teşekkürler, en kısa sürede size yardımcı olacağım.',
          timestamp: new Date().toISOString(),
          isMine: false,
          sender: this.activeConversation.name,
        };

        // Mesajlar listesini güncelle
        this.messages = [...this.messages, response];

        // Konuşma listesinde son mesajı güncelle
        this.conversationList = this.conversationList.map((c) => {
          if (c.id === this.activeConversation?.id) {
            return {
              ...c,
              lastMessage: response.text,
              timestamp: response.timestamp,
            };
          }
          return c;
        });

        // Konuşma listesini sırala
        this.conversationList.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }
    }, 1000);
  }

  formatTime(timestamp: string): string {
    const messageDate = new Date(timestamp);
    const now = new Date();

    // Aynı gün içinde
    if (messageDate.toDateString() === now.toDateString()) {
      return `${messageDate.getHours()}:${messageDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    }

    // Dün
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Dün';
    }

    // 1 hafta içinde
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (messageDate > oneWeekAgo) {
      const days = [
        'Pazar',
        'Pazartesi',
        'Salı',
        'Çarşamba',
        'Perşembe',
        'Cuma',
        'Cumartesi',
      ];
      return days[messageDate.getDay()];
    }

    // Daha eski
    return `${messageDate.getDate()}/${
      messageDate.getMonth() + 1
    }/${messageDate.getFullYear()}`;
  }

  getUnreadCount(): number {
    return this.conversationList.reduce(
      (total, conv) => total + conv.unread,
      0
    );
  }
}
