import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';

// Action types for the sidebar reducer
const SIDEBAR_ACTIONS = {
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  OPEN_SIDEBAR: 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
  SET_ACTIVE_ITEM: 'SET_ACTIVE_ITEM',
  SET_COLLAPSED: 'SET_COLLAPSED',
  SET_MOBILE_VIEW: 'SET_MOBILE_VIEW',
  SET_HOVER_STATE: 'SET_HOVER_STATE',
  ADD_MENU_ITEM: 'ADD_MENU_ITEM',
  REMOVE_MENU_ITEM: 'REMOVE_MENU_ITEM',
  UPDATE_MENU_ITEM: 'UPDATE_MENU_ITEM',
  SET_THEME: 'SET_THEME',
  SET_SIDEBAR_WIDTH: 'SET_SIDEBAR_WIDTH',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  TOGGLE_SUBMENU: 'TOGGLE_SUBMENU',
  SET_BREADCRUMBS: 'SET_BREADCRUMBS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  SET_PINNED_ITEMS: 'SET_PINNED_ITEMS',
  TOGGLE_PIN_ITEM: 'TOGGLE_PIN_ITEM'
};

// Default sidebar configuration
const DEFAULT_SIDEBAR_CONFIG = {
  isOpen: true,
  isCollapsed: false,
  isMobile: false,
  isHovered: false,
  activeItem: null,
  theme: 'light',
  width: 280,
  collapsedWidth: 64,
  loading: false,
  error: null,
  searchQuery: '',
  notifications: [],
  pinnedItems: [],
  menuItems: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
      badge: null,
      children: []
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'analytics',
      path: '/analytics',
      badge: { count: 3, type: 'info' },
      children: [
        { id: 'reports', label: 'Reports', path: '/analytics/reports' },
        { id: 'metrics', label: 'Metrics', path: '/analytics/metrics' }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'users',
      path: '/users',
      badge: null,
      children: []
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      path: '/settings',
      badge: null,
      children: [
        { id: 'general', label: 'General', path: '/settings/general' },
        { id: 'security', label: 'Security', path: '/settings/security' },
        { id: 'preferences', label: 'Preferences', path: '/settings/preferences' }
      ]
    }
  ],
  openSubmenus: new Set(),
  breadcrumbs: [],
  userPreferences: {
    autoCollapse: false,
    showIcons: true,
    enableAnimations: true,
    rememberState: true,
    compactMode: false
  }
};

// Sidebar reducer function
const sidebarReducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpen: !state.isOpen,
        error: null
      };

    case SIDEBAR_ACTIONS.OPEN_SIDEBAR:
      return {
        ...state,
        isOpen: true,
        error: null
      };

    case SIDEBAR_ACTIONS.CLOSE_SIDEBAR:
      return {
        ...state,
        isOpen: false,
        error: null
      };

    case SIDEBAR_ACTIONS.SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload,
        error: null
      };

    case SIDEBAR_ACTIONS.SET_COLLAPSED:
      return {
        ...state,
        isCollapsed: action.payload,
        error: null
      };

    case SIDEBAR_ACTIONS.SET_MOBILE_VIEW:
      return {
        ...state,
        isMobile: action.payload,
        isOpen: action.payload ? false : state.isOpen,
        error: null
      };

    case SIDEBAR_ACTIONS.SET_HOVER_STATE:
      return {
        ...state,
        isHovered: action.payload,
        error: null
      };

    case SIDEBAR_ACTIONS.ADD_MENU_ITEM:
      return {
        ...state,
        menuItems: [...state.menuItems, action.payload],
        error: null
      };

    case SIDEBAR_ACTIONS.REMOVE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.filter(item => item.id !== action.payload),
        error: null
      };

    case SIDEBAR_ACTIONS.UPDATE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload.updates } : item
        ),
        error: null
      };

    case SIDEBAR_ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload,
        error: null
      };

    case SIDEBAR_ACTIONS.SET_SIDEBAR_WIDTH:
      return {
        ...state,
        width: action.payload,
        error: null
      };

    case SIDEBAR_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SIDEBAR_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case SIDEBAR_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case SIDEBAR_ACTIONS.SET_USER_PREFERENCES:
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload },
        error: null
      };

    case SIDEBAR_ACTIONS.TOGGLE_SUBMENU:
      const newOpenSubmenus = new Set(state.openSubmenus);
      if (newOpenSubmenus.has(action.payload)) {
        newOpenSubmenus.delete(action.payload);
      } else {
        newOpenSubmenus.add(action.payload);
      }
      return {
        ...state,
        openSubmenus: newOpenSubmenus,
        error: null
      };

    case SIDEBAR_ACTIONS.SET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: action.payload,
        error: null
      };

    case SIDEBAR_ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        error: null
      };

    case SIDEBAR_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        error: null
      };

    case SIDEBAR_ACTIONS.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
        error: null
      };

    case SIDEBAR_ACTIONS.SET_PINNED_ITEMS:
      return {
        ...state,
        pinnedItems: action.payload,
        error: null
      };

    case SIDEBAR_ACTIONS.TOGGLE_PIN_ITEM:
      const itemId = action.payload;
      const isPinned = state.pinnedItems.includes(itemId);
      return {
        ...state,
        pinnedItems: isPinned
          ? state.pinnedItems.filter(id => id !== itemId)
          : [...state.pinnedItems, itemId],
        error: null
      };

    default:
      return state;
  }
};

// Create the sidebar context
const SidebarContext = createContext(null);

// Custom hook to use the sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// Sidebar provider component
export const SidebarProvider = ({ children, initialConfig = {} }) => {
  const [state, dispatch] = useReducer(
    sidebarReducer,
    { ...DEFAULT_SIDEBAR_CONFIG, ...initialConfig }
  );

  // Effect to handle window resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      dispatch({ type: SIDEBAR_ACTIONS.SET_MOBILE_VIEW, payload: isMobile });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        dispatch({ type: SIDEBAR_ACTIONS.TOGGLE_SIDEBAR });
      }
      if (event.key === 'Escape' && state.isMobile && state.isOpen) {
        dispatch({ type: SIDEBAR_ACTIONS.CLOSE_SIDEBAR });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.isMobile, state.isOpen]);

  // Effect to save state to localStorage
  useEffect(() => {
    if (state.userPreferences.rememberState) {
      const stateToSave = {
        isOpen: state.isOpen,
        isCollapsed: state.isCollapsed,
        theme: state.theme,
        width: state.width,
        pinnedItems: state.pinnedItems,
        userPreferences: state.userPreferences
      };
      localStorage.setItem('sidebarState', JSON.stringify(stateToSave));
    }
  }, [state.isOpen, state.isCollapsed, state.theme, state.width, state.pinnedItems, state.userPreferences]);

  // Action creators
  const actions = useMemo(() => ({
    toggleSidebar: () => dispatch({ type: SIDEBAR_ACTIONS.TOGGLE_SIDEBAR }),
    openSidebar: () => dispatch({ type: SIDEBAR_ACTIONS.OPEN_SIDEBAR }),
    closeSidebar: () => dispatch({ type: SIDEBAR_ACTIONS.CLOSE_SIDEBAR }),
    setActiveItem: (itemId) => dispatch({ type: SIDEBAR_ACTIONS.SET_ACTIVE_ITEM, payload: itemId }),
    setCollapsed: (collapsed) => dispatch({ type: SIDEBAR_ACTIONS.SET_COLLAPSED, payload: collapsed }),
    setHoverState: (hovered) => dispatch({ type: SIDEBAR_ACTIONS.SET_HOVER_STATE, payload: hovered }),
    setTheme: (theme) => dispatch({ type: SIDEBAR_ACTIONS.SET_THEME, payload: theme }),
    setSidebarWidth: (width) => dispatch({ type: SIDEBAR_ACTIONS.SET_SIDEBAR_WIDTH, payload: width }),
    setLoading: (loading) => dispatch({ type: SIDEBAR_ACTIONS.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: SIDEBAR_ACTIONS.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: SIDEBAR_ACTIONS.CLEAR_ERROR }),
    setUserPreferences: (preferences) => dispatch({ type: SIDEBAR_ACTIONS.SET_USER_PREFERENCES, payload: preferences }),
    toggleSubmenu: (itemId) => dispatch({ type: SIDEBAR_ACTIONS.TOGGLE_SUBMENU, payload: itemId }),
    setBreadcrumbs: (breadcrumbs) => dispatch({ type: SIDEBAR_ACTIONS.SET_BREADCRUMBS, payload: breadcrumbs }),
    setSearchQuery: (query) => dispatch({ type: SIDEBAR_ACTIONS.SET_SEARCH_QUERY, payload: query }),
    setNotifications: (notifications) => dispatch({ type: SIDEBAR_ACTIONS.SET_NOTIFICATIONS, payload: notifications }),
    markNotificationRead: (notificationId) => dispatch({ type: SIDEBAR_ACTIONS.MARK_NOTIFICATION_READ, payload: notificationId }),
    setPinnedItems: (items) => dispatch({ type: SIDEBAR_ACTIONS.SET_PINNED_ITEMS, payload: items }),
    togglePinItem: (itemId) => dispatch({ type: SIDEBAR_ACTIONS.TOGGLE_PIN_ITEM, payload: itemId }),
    
    // Menu item management
    addMenuItem: (item) => dispatch({ type: SIDEBAR_ACTIONS.ADD_MENU_ITEM, payload: item }),
    removeMenuItem: (itemId) => dispatch({ type: SIDEBAR_ACTIONS.REMOVE_MENU_ITEM, payload: itemId }),
    updateMenuItem: (itemId, updates) => dispatch({ 
      type: SIDEBAR_ACTIONS.UPDATE_MENU_ITEM, 
      payload: { id: itemId, updates } 
    })
  }), []);

  // Utility functions
  const utils = useMemo(() => ({
    getMenuItemById: (id) => state.menuItems.find(item => item.id === id),
    getActiveMenuPath: () => {
      const activeItem = state.menuItems.find(item => item.id === state.activeItem);
      return activeItem ? activeItem.path : null;
    },
    getFilteredMenuItems: () => {
      if (!state.searchQuery) return state.menuItems;
      return state.menuItems.filter(item =>
        item.label.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        item.children.some(child =>
          child.label.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
      );
    },
    getPinnedMenuItems: () => {
      return state.menuItems.filter(item => state.pinnedItems.includes(item.id));
    },
    getUnreadNotificationCount: () => {
      return state.notifications.filter(notification => !notification.read).length;
    },
    isSubmenuOpen: (itemId) => state.openSubmenus.has(itemId),
    getCurrentWidth: () => {
      if (state.isMobile) return '100%';
      if (state.isCollapsed) return state.collapsedWidth;
      return state.width;
    }
  }), [state]);

  // Context value
  const contextValue = useMemo(() => ({
    ...state,
    actions,
    utils,
    dispatch
  }), [state, actions, utils]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

// Higher-order component for sidebar-aware components
export const withSidebar = (Component) => {
  return function WithSidebarComponent(props) {
    const sidebarContext = useSidebar();
    return <Component {...props} sidebar={sidebarContext} />;
  };
};

// Hook for sidebar keyboard shortcuts
export const useSidebarShortcuts = (shortcuts = {}) => {
  const { actions } = useSidebar();

  useEffect(() => {
    const defaultShortcuts = {
      'ctrl+b': actions.toggleSidebar,
      'ctrl+shift+c': () => actions.setCollapsed(!actions.isCollapsed),
      ...shortcuts
    };

    const handleKeyDown = (event) => {
      const key = [];
      if (event.ctrlKey) key.push('ctrl');
      if (event.shiftKey) key.push('shift');
      if (event.altKey) key.push('alt');
      key.push(event.key.toLowerCase());
      
      const shortcut = key.join('+');
      if (defaultShortcuts[shortcut]) {
        event.preventDefault();
        defaultShortcuts[shortcut]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, actions]);
};

// Export constants for external use
export { SIDEBAR_ACTIONS, DEFAULT_SIDEBAR_CONFIG };


