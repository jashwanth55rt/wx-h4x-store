// WX H4X STORE - Database Manager Module
// Phase 1: Firebase Database Operations

class DatabaseManager {
  
  // USERS COLLECTION OPERATIONS
  
  // Create User
  static async createUser(userData) {
    try {
      const uid = firebase.auth().currentUser.uid;
      await firebase.firestore().collection('users').doc(uid).set(userData);
      return { success: true, message: 'User created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get User
  static async getUser(uid) {
    try {
      const doc = await firebase.firestore().collection('users').doc(uid).get();
      if (doc.exists) {
        return { success: true, data: doc.data() };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update User
  static async updateUser(uid, userData) {
    try {
      await firebase.firestore().collection('users').doc(uid).update({
        ...userData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, message: 'User updated successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Delete User
  static async deleteUser(uid) {
    try {
      await firebase.firestore().collection('users').doc(uid).delete();
      return { success: true, message: 'User deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get All Users
  static async getAllUsers(limit = 100) {
    try {
      const snapshot = await firebase.firestore().collection('users').limit(limit).get();
      const users = [];
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get Users by Role
  static async getUsersByRole(role, limit = 100) {
    try {
      const snapshot = await firebase.firestore()
        .collection('users')
        .where('role', '==', role)
        .limit(limit)
        .get();
      const users = [];
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // PRODUCTS COLLECTION OPERATIONS

  // Create Product
  static async createProduct(productData) {
    try {
      const docRef = await firebase.firestore().collection('products').add({
        ...productData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        views: 0,
        downloads: 0,
        likes: 0,
        ratings: 0,
        reviews: 0
      });
      return { success: true, id: docRef.id, message: 'Product created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get Product
  static async getProduct(productId) {
    try {
      const doc = await firebase.firestore().collection('products').doc(productId).get();
      if (doc.exists) {
        return { success: true, data: { id: doc.id, ...doc.data() } };
      }
      return { success: false, error: 'Product not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update Product
  static async updateProduct(productId, productData) {
    try {
      await firebase.firestore().collection('products').doc(productId).update({
        ...productData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, message: 'Product updated successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Delete Product
  static async deleteProduct(productId) {
    try {
      await firebase.firestore().collection('products').doc(productId).delete();
      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get All Products
  static async getAllProducts(limit = 100) {
    try {
      const snapshot = await firebase.firestore().collection('products').limit(limit).get();
      const products = [];
      snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get Products by Category
  static async getProductsByCategory(category, limit = 100) {
    try {
      const snapshot = await firebase.firestore()
        .collection('products')
        .where('category', '==', category)
        .limit(limit)
        .get();
      const products = [];
      snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ORDERS COLLECTION OPERATIONS

  // Create Order
  static async createOrder(orderData) {
    try {
      const docRef = await firebase.firestore().collection('orders').add({
        ...orderData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'pending'
      });
      return { success: true, id: docRef.id, message: 'Order created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get Order
  static async getOrder(orderId) {
    try {
      const doc = await firebase.firestore().collection('orders').doc(orderId).get();
      if (doc.exists) {
        return { success: true, data: { id: doc.id, ...doc.data() } };
      }
      return { success: false, error: 'Order not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update Order
  static async updateOrder(orderId, orderData) {
    try {
      await firebase.firestore().collection('orders').doc(orderId).update({
        ...orderData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, message: 'Order updated successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get User Orders
  static async getUserOrders(userId, limit = 100) {
    try {
      const snapshot = await firebase.firestore()
        .collection('orders')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
      const orders = [];
      snapshot.forEach(doc => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: orders };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // PAYMENTS COLLECTION OPERATIONS

  // Create Payment
  static async createPayment(paymentData) {
    try {
      const docRef = await firebase.firestore().collection('payments').add({
        ...paymentData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'pending'
      });
      return { success: true, id: docRef.id, message: 'Payment created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update Payment
  static async updatePayment(paymentId, paymentData) {
    try {
      await firebase.firestore().collection('payments').doc(paymentId).update({
        ...paymentData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, message: 'Payment updated successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get Payment
  static async getPayment(paymentId) {
    try {
      const doc = await firebase.firestore().collection('payments').doc(paymentId).get();
      if (doc.exists) {
        return { success: true, data: { id: doc.id, ...doc.data() } };
      }
      return { success: false, error: 'Payment not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // LICENSES COLLECTION OPERATIONS

  // Create License
  static async createLicense(licenseData) {
    try {
      const docRef = await firebase.firestore().collection('licenses').add({
        ...licenseData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'active'
      });
      return { success: true, id: docRef.id, message: 'License created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get User Licenses
  static async getUserLicenses(userId, limit = 100) {
    try {
      const snapshot = await firebase.firestore()
        .collection('licenses')
        .where('userId', '==', userId)
        .limit(limit)
        .get();
      const licenses = [];
      snapshot.forEach(doc => {
        licenses.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: licenses };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ANALYTICS OPERATIONS

  // Log Analytics
  static async logAnalytics(action, data) {
    try {
      const uid = firebase.auth().currentUser?.uid || 'anonymous';
      await firebase.firestore().collection('analytics').add({
        userId: uid,
        action: action,
        data: data,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        deviceInfo: Utils.getDeviceInfo()
      });
      return { success: true };
    } catch (error) {
      console.error('Analytics error:', error);
      return { success: false };
    }
  }

  // Batch Write
  static async batchWrite(operations) {
    try {
      const batch = firebase.firestore().batch();
      operations.forEach(op => {
        if (op.type === 'set') {
          batch.set(op.ref, op.data);
        } else if (op.type === 'update') {
          batch.update(op.ref, op.data);
        } else if (op.type === 'delete') {
          batch.delete(op.ref);
        }
      });
      await batch.commit();
      return { success: true, message: 'Batch write completed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

window.DatabaseManager = DatabaseManager;
