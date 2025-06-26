# Chef Plate - Restaurant Management Mobile App

A comprehensive React Native Expo application designed for restaurant chefs and kitchen staff to manage orders, menus, earnings, and customer interactions efficiently.

## 📱 App Overview

Chef Plate is a mobile application that provides restaurant chefs with a centralized platform to:
- Receive and manage incoming orders
- Track earnings and order history
- Manage restaurant menus and items
- Monitor restaurant status and customer feedback
- Handle order fulfillment workflow

## ✨ Key Features

### 🔐 Authentication System
- **Login Screen**: Secure login with ID and password
- **OTP Verification**: Two-factor authentication for enhanced security
- **Session Management**: Persistent login state across app sessions

### 🏠 Dashboard (Home)
- **Real-time Order Notifications**: Instant alerts for new incoming orders
- **Order Preview**: Quick view of order details including customer info, quantity, and ratings
- **Accept/Decline Actions**: Simple buttons to accept or decline orders
- **Auto-refresh**: Automatic simulation of new orders every 5 seconds

### 📋 Order Management
- **Active Orders**: View and manage current pending orders
- **Order Details**: Comprehensive order information including:
  - Order ID and customer name
  - Delivery partner information
  - Quantity and user ratings
  - Expandable view for additional actions
- **Order Completion**: Generate OTP for order completion
- **Previous Orders**: Historical order tracking with checkbox selection
- **Order Status Tracking**: Visual indicators for order states

### 🍽️ Menu Management
- **Today's Menu**: Manage daily menu items across three time slots:
  - Morning items (Idli, Dosa, Vada)
  - Afternoon items (Rice, Sambar, Poriyal)
  - Night items (Chapati, Paneer, Curd Rice)
- **Quantity Tracking**: Real-time inventory management with +/- controls
- **Menu Status**: Toggle active/inactive status for each time slot
- **Item Management**: Add, edit, and delete menu items
- **Manage Items**: Separate section for:
  - Adding new items with pricing
  - Editing existing items
  - Removing items from inventory
  - Checkbox selection for bulk operations

### 💰 Earnings Tracking
- **Earnings Overview**: Display total earnings with order breakdown
- **Order-wise Earnings**: Individual order earnings with:
  - Order ID and customer information
  - Ordered items details
  - Earning amounts in currency format
- **Chef Profile Integration**: Welcome message with chef ID

### 👤 Profile Management
- **Chef Profile**: Personal chef information and avatar
- **Restaurant Status**: Toggle restaurant online/offline status
- **Contact Admin**: Direct communication channel
- **Feedback System**: 
  - Send feedback to administration
  - View customer feedbacks
- **Settings Management**: Restaurant operational controls

## 🏗️ Project Structure

```
chef-plate-app/
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx          # Auth navigation wrapper
│   │   └── login.tsx            # Login screen
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Main tabs navigation with custom tab bar
│   │   ├── index.tsx            # Home/Dashboard screen
│   │   ├── earnings.tsx         # Earnings tracking screen
│   │   ├── orders.tsx           # Order management screen
│   │   └── menu.tsx             # Menu management screen
│   ├── (user)/
│   │   ├── profile.tsx          # Chef profile screen
│   │   └── view-feedbacks.tsx   # Customer feedback viewing
│   ├── _layout.tsx              # Root layout with navigation setup
│   ├── otp.tsx                  # OTP verification screen
│   └── globals.css              # Global Tailwind CSS styles
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chef-plate-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI (if not already installed)**
   ```bash
   npm install -g @expo/cli
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## 📱 Usage Guide

### Getting Started
1. **Launch the app** and you'll see the login screen
2. **Enter credentials** (ID and Password)
3. **Complete OTP verification** with a 6-digit code
4. **Access the main dashboard** with four main tabs

### Navigation Flow
```
Login → OTP Verification → Main App (Tabs)
├── Home (Dashboard)
├── Earnings
├── Orders
└── Menu
```

### Main Features Usage

#### Dashboard Operations
- **New Order Handling**: When a new order appears, review details and tap "Accept" or "Decline"
- **Order Information**: View customer name, quantity, ratings, and delivery partner
- **Status Monitoring**: Check order status and customer ratings

#### Menu Management
- **Switch between tabs**: "Today's Menu" and "Manage Items"
- **Today's Menu**: 
  - Toggle time slots (Morning/Afternoon/Night) active/inactive
  - Adjust quantities using +/- buttons
  - Add new items to specific time slots
  - Delete items using checkbox selection
- **Manage Items**:
  - Add new items with name and price
  - Edit existing items by expanding and updating
  - Remove items from inventory

#### Order Processing
- **Active Orders**: View current orders requiring attention
- **Order Actions**: Expand orders to see completion options
- **Generate OTP**: Complete orders by generating verification codes
- **Previous Orders**: Review completed order history

#### Profile Management
- **Restaurant Status**: Toggle between "ON" and "OFF" status
- **Feedback**: Send feedback to admin or view customer feedback
- **Contact**: Direct communication with administration

## 🛠️ Technical Implementation

### Framework & Libraries
- **React Native**: Cross-platform mobile development
- **Expo Router**: File-based navigation system
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling (via NativeWind)
- **Expo Vector Icons**: Icon library (Ionicons, MaterialIcons, Feather, Entypo)
- **React Native Safe Area Context**: Safe area handling

### Key Dependencies
```json
{
  "expo": "~51.0.0",
  "expo-router": "~3.5.0",
  "react-native": "0.74.0",
  "react-native-safe-area-context": "4.10.0",
  "@expo/vector-icons": "^14.0.0"
}
```

### State Management
- **React Hooks**: useState, useEffect, useCallback for local state
- **Local State**: Component-level state management
- **Mock Data**: Hardcoded data for demonstration purposes

### Navigation Structure
```
Stack Navigator (Root)
├── (auth) - Authentication Stack
│   └── login - Login Screen
├── otp - OTP Verification
└── (tabs) - Main App Tabs
    ├── index - Home/Dashboard
    ├── earnings - Earnings Screen
    ├── orders - Orders Management
    ├── menu - Menu Management
    └── (user) - User Profile Stack
        ├── profile - Profile Screen
        └── view-feedbacks - Feedback Screen
```

## 🎨 Design System

### Color Palette
- **Primary Background**: `#FFFFFF` (White)
- **Secondary Background**: `#E5E7EB` (Light Gray)
- **Header Background**: `#DBDBDB` (Medium Gray)
- **Card Background**: `#4A4A4A` (Dark Gray)
- **Success Color**: `#4CAF50` (Green)
- **Error Color**: `#FF4D4D` (Red)
- **Active Status**: `#1DB954` (Green)
- **Inactive Status**: `#E53935` (Red)

### Typography
- **Headers**: Bold, 24-32px, Letter spacing
- **Body Text**: Regular, 14-16px
- **Labels**: Semi-bold, 12-14px, Uppercase
- **Buttons**: Bold, 16-18px, Letter spacing

### Component Styling
- **Rounded Corners**: Consistent border radius (8px, 16px, 24px, 32px)
- **Shadows**: Subtle elevation with shadow properties
- **Spacing**: Consistent padding and margins (8px, 16px, 24px)
- **Interactive Elements**: Active opacity and touch feedback

## 📊 Data Models

### Order Interface
```typescript
interface Order {
  id: string;
  name: string;
  deliveryPartner: string;
  quantity: number;
  userRating: number;
  status: "active" | "previous";
}
```

### Menu Item Interface
```typescript
interface MenuItem {
  name: string;
  count: number;
}

interface MenuState {
  morning: MenuItem[];
  afternoon: MenuItem[];
  night: MenuItem[];
}
```

### Manageable Item Interface
```typescript
interface ManageableItem {
  name: string;
  price: string;
  checked: boolean;
}
```

### Earnings Interface
```typescript
interface EarningItem {
  orderId: string;
  name: string;
  item: string;
  amount: string;
}
```

## 🔧 Configuration

### Expo Configuration
The app uses Expo's managed workflow with file-based routing. Key configurations:

- **Initial Route**: `(auth)` - Authentication flow
- **Header Management**: Custom headers with safe area handling
- **Tab Bar**: Custom tab bar implementation with animations
- **Status Bar**: Consistent status bar styling across screens

### Navigation Configuration
- **Stack Navigation**: For main app flow
- **Tab Navigation**: For main app sections
- **Modal Presentation**: For certain screens
- **Header Customization**: Custom headers with back buttons and profile access

## 🚦 App Flow

### Authentication Flow
1. **App Launch** → Login Screen
2. **Login Success** → OTP Verification
3. **OTP Success** → Main Dashboard

### Main App Flow
1. **Dashboard** → View new orders → Accept/Decline
2. **Orders** → Manage active orders → Complete with OTP
3. **Menu** → Update today's menu → Manage inventory
4. **Earnings** → View order earnings → Track performance
5. **Profile** → Manage settings → View feedback

## 🔄 State Management Patterns

### Local State Patterns
- **Form State**: Input handling with controlled components
- **UI State**: Modal visibility, expanded states, tab selection
- **Data State**: Mock data management with CRUD operations
- **Navigation State**: Route parameters and navigation actions

### Common Hooks Usage
- **useState**: Component state management
- **useEffect**: Side effects and lifecycle management
- **useCallback**: Performance optimization for event handlers
- **useRouter**: Navigation and routing
- **useSafeAreaInsets**: Safe area handling

## 🎯 Future Enhancements

### Potential Features
- **Real-time Notifications**: Push notifications for new orders
- **Database Integration**: Backend API integration
- **Payment Processing**: Integrated payment handling
- **Analytics Dashboard**: Performance metrics and insights
- **Multi-language Support**: Internationalization
- **Offline Mode**: Local data persistence
- **Photo Upload**: Menu item images
- **Chat System**: Customer communication
- **Inventory Management**: Advanced stock tracking
- **Reporting**: Detailed business reports

### Technical Improvements
- **State Management**: Redux or Zustand integration
- **API Layer**: RESTful API or GraphQL integration
- **Testing**: Unit and integration tests
- **Performance**: Optimization and caching
- **Security**: Enhanced authentication and data protection
- **Accessibility**: Screen reader and accessibility improvements

## 🐛 Known Issues & Limitations

### Current Limitations
- **Mock Data**: All data is hardcoded for demonstration
- **No Persistence**: Data resets on app restart
- **No Backend**: No server-side integration
- **Limited Validation**: Basic form validation only
- **No Real-time Updates**: Simulated real-time features

### Development Notes
- **Platform Specific**: Some styling may need platform-specific adjustments
- **Performance**: Large lists may need virtualization
- **Memory Management**: Image handling optimization needed
- **Error Handling**: Enhanced error boundaries recommended

## 📄 License

This project is developed for demonstration purposes. Please refer to the license file for usage rights and restrictions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or questions about the Chef Plate app, please contact the development team or create an issue in the repository.

---

**Chef Plate** - Streamlining restaurant operations, one order at a time! 🍽️👨‍🍳
```
