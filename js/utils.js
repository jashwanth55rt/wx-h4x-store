// WX H4X STORE - Utility Functions Module
// Phase 1: Core Utilities

class Utils {
  
  // Generate UUID
  static generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Format Date
  static formatDate(date, format = 'DD/MM/YYYY') {
    if (!date) return '';
    const d = new Date(date.seconds ? date.seconds * 1000 : date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    if (format === 'DD/MM/YYYY') return `${day}/${month}/${year}`;
    if (format === 'MM/DD/YYYY') return `${month}/${day}/${year}`;
    if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
    
    return d.toLocaleDateString();
  }

  // Format Time
  static formatTime(date) {
    if (!date) return '';
    const d = new Date(date.seconds ? date.seconds * 1000 : date);
    return d.toLocaleTimeString();
  }

  // Format DateTime
  static formatDateTime(date) {
    return `${this.formatDate(date)} ${this.formatTime(date)}`;
  }

  // Format Currency
  static formatCurrency(amount, currency = 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Format Number
  static formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num);
  }

  // Validate Email
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Validate Password
  static validatePassword(password) {
    return password.length >= 8;
  }

  // Validate Phone
  static validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/[^\d]/g, ''));
  }

  // Show Notification
  static showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }

  // Copy to Clipboard
  static copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showNotification('Copied to clipboard', 'success', 2000);
    }).catch(err => {
      this.showNotification('Failed to copy', 'error');
    });
  }

  // Download File
  static downloadFile(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Get Query Parameter
  static getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }

  // Get All Query Parameters
  static getAllQueryParams() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  // Redirect
  static redirect(url) {
    window.location.href = url;
  }

  // Deep Clone Object
  static deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // Merge Objects
  static mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
  }

  // Truncate String
  static truncateString(str, length = 50) {
    if (str.length > length) {
      return str.substring(0, length) + '...';
    }
    return str;
  }

  // Capitalize String
  static capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Get Local Storage
  static getLocalStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      return localStorage.getItem(key);
    }
  }

  // Set Local Storage
  static setLocalStorage(key, value) {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  }

  // Remove Local Storage
  static removeLocalStorage(key) {
    localStorage.removeItem(key);
  }

  // Clear Local Storage
  static clearLocalStorage() {
    localStorage.clear();
  }

  // Debounce Function
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle Function
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Check Internet Connection
  static async checkInternetConnection() {
    try {
      const response = await fetch('https://www.google.com', { mode: 'no-cors' });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get Device Info
  static getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth
      },
      timestamp: new Date().toISOString()
    };
  }

  // Format File Size
  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  // Generate Random String
  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Check if Mobile
  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Check if Tablet
  static isTablet() {
    return /iPad|Android/i.test(navigator.userAgent);
  }

  // Get Screen Size
  static getScreenSize() {
    if (window.innerWidth < 768) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
  }
}

window.Utils = Utils;
