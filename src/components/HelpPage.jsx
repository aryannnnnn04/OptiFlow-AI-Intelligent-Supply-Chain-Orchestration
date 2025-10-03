import React, { useState } from 'react';
import { HelpCircle, Search, MessageCircle, BookOpen, Video, Mail, Phone, ChevronRight, FileText, Download } from 'lucide-react';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const helpTopics = [
    {
      category: 'Getting Started',
      icon: BookOpen,
      articles: [
        { title: 'Introduction to OptiFlow AI', description: 'Learn the basics of our supply chain intelligence platform' },
        { title: 'Navigating the Dashboard', description: 'Understand the layout and key features of the dashboard' },
        { title: 'Setting up Your Profile', description: 'Configure your account settings and preferences' }
      ]
    },
    {
      category: 'Forecasting',
      icon: TrendingUp,
      articles: [
        { title: 'Understanding Demand Forecasts', description: 'How our AI predicts future demand patterns' },
        { title: 'Adjusting Forecast Parameters', description: 'Customize forecasting models for your business' },
        { title: 'Interpreting Accuracy Metrics', description: 'Understanding forecast accuracy and confidence levels' }
      ]
    },
    {
      category: 'Inventory Management',
      icon: Package,
      articles: [
        { title: 'Managing Stock Levels', description: 'Best practices for inventory optimization' },
        { title: 'Setting Reorder Points', description: 'Configure automated reorder triggers' },
        { title: 'Analyzing Turnover Rates', description: 'Understanding inventory performance metrics' }
      ]
    },
    {
      category: 'Disruption Management',
      icon: AlertTriangle,
      articles: [
        { title: 'Monitoring Supply Chain Risks', description: 'How our system identifies potential disruptions' },
        { title: 'Responding to Alerts', description: 'Best practices for handling disruption notifications' },
        { title: 'Implementing Contingency Plans', description: 'Strategies for minimizing disruption impact' }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How often are forecasts updated?',
      answer: 'Our AI models update forecasts every 4 hours with the latest data, but you can manually trigger updates at any time.'
    },
    {
      question: 'What data sources are used for predictions?',
      answer: 'We analyze historical data, market trends, seasonal patterns, supplier performance, and external factors like weather and economic indicators.'
    },
    {
      question: 'Can I export reports?',
      answer: 'Yes, all reports and dashboards can be exported in PDF, Excel, and CSV formats using the export buttons throughout the application.'
    },
    {
      question: 'How do I set up alerts?',
      answer: 'Navigate to Settings > Notifications to configure email, SMS, and in-app alerts for various supply chain events.'
    }
  ];

  const filteredTopics = helpTopics.map(topic => ({
    ...topic,
    articles: topic.articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(topic => topic.articles.length > 0);

  return (
    <div className="space-y-6 min-h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Help Center</h2>
      </div>

      {/* Search Bar */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Help Topics */}
        <div className="lg:col-span-2 space-y-6">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <topic.icon className="w-5 h-5 mr-2" />
                  {topic.category}
                </h3>
                <div className="space-y-3">
                  {topic.articles.map((article, articleIndex) => (
                    <div key={articleIndex} className="flex items-start justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div>
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{article.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 border border-white/20 text-center">
              <HelpCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No articles found</h3>
              <p className="text-slate-400">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Support Resources */}
        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4">Contact Support</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <MessageCircle className="w-5 h-5 text-cyan-400" />
                <span>Live Chat</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>Email Support</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>Call Us</span>
              </button>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>User Guide</span>
                <Download className="w-4 h-4 text-slate-400 ml-auto" />
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Video className="w-5 h-5 text-cyan-400" />
                <span>Video Tutorials</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>API Documentation</span>
              </button>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4">FAQ</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-sm text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;