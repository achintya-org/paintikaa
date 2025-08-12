import React, { useState, useEffect } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  UploadOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Button,
  theme,
  ConfigProvider,
  ColorPicker,
  Dropdown,
  Menu as AntdMenu,
} from "antd";
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from "react-router-dom";
import { auth } from "./firebase";
import PhoneAuth from "./components/PhoneAuth";
import UploadMedia from "./components/UploadMedia";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { AboutUs, ContactUs, PrivacyPolicy, ShippingPolicy } from "./pages";
import Home from "./pages/Home.js";
import Product from "./pages/Product";

const { Header, Content, Footer, Sider } = Layout;

const navItems = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const siderItems = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const colorTokens = {
  colorPrimary: "Primary Color",
  colorBgContainer: "Background Color",
  colorText: "Text Color",
  colorTextLightSolid: "Light Text Color",
};

function AppContent({ themeColors, setThemeColors }) {
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [user, setUser] = useState(null);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const showSidebar = location.pathname === "/";

  // State for which color token is selected
  const [selectedColorToken, setSelectedColorToken] = useState("colorPrimary");
  // Control color picker open/close
  const [pickerVisible, setPickerVisible] = useState(false);

  // When user selects token from dropdown, update and open picker
  const onMenuClick = ({ key }) => {
    setSelectedColorToken(key);
    setPickerVisible(true); // open color picker immediately after selection
  };

  // Handle color change updates themeColors state
  const handleColorChange = (color) => {
    if (!color) return;
    setThemeColors((prev) => ({
      ...prev,
      [selectedColorToken]: color.toHexString(),
    }));
  };

  const menu = (
    <AntdMenu
      selectedKeys={[selectedColorToken]}
      onClick={onMenuClick}
      items={Object.entries(colorTokens).map(([tokenKey, label]) => ({
        key: tokenKey,
        label,
        icon: <BgColorsOutlined />,
      }))}
    />
  );

  return (
    <>
      <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            backgroundColor: themeColors.colorPrimary,
          }}
        >
          {/* Left side: Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 24,
            }}
            aria-label="Go to homepage"
          >
            <img
              src="/favicon.png"
              alt="Paintikaa Logo"
              style={{ height: 40, marginRight: 12 }}
            />
            <h2 style={{ color: "white", margin: 0, userSelect: "none" }}>
              Paintikaa
            </h2>
          </Link>

          {/* Center: Navigation Menu */}
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={navItems}
            style={{ flex: 1, minWidth: 0, backgroundColor: themeColors.colorPrimary }}
          />

          {/* Right side: Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            {user && (
              <>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={<BgColorsOutlined style={{ fontSize: 20, color: "white" }} />}
                    style={{ color: "white" }}
                    onClick={(e) => e.preventDefault()} // prevent default to keep dropdown stable
                  />
                </Dropdown>

                {/* Show ColorPicker only when pickerVisible is true */}
                {pickerVisible && (
                  <ColorPicker
                    value={themeColors[selectedColorToken]}
                    onChange={handleColorChange}
                    placement="bottomRight"
                    style={{ width: 120 }}
                    open={pickerVisible}
                    onOpenChange={setPickerVisible}
                  />
                )}

                <Button
                  type="text"
                  icon={<UploadOutlined style={{ fontSize: 18 }} />}
                  onClick={() => setShowUpload(true)}
                  style={{ color: "white" }}
                >
                  Upload
                </Button>
              </>
            )}
            {user ? (
              <Button
                type="text"
                onClick={() => signOut(auth)}
                style={{ color: "white" }}
              >
                Logout
              </Button>
            ) : (
              <Button
                type="text"
                onClick={() => setShowPhoneAuth(true)}
                style={{ color: "white" }}
              >
                Login
              </Button>
            )}
          </div>
        </Header>

        {/* Content area grows and scrolls if needed */}
        <Layout
          style={{
            flex: 1,
            padding: "0 48px 24px",
            marginTop: 16,
          }}
        >
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              { title: "Home" },
              ...(location.pathname !== "/" ? [{ title: location.pathname.replace("/", "") }] : []),
            ]}
          />
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flex: 1,
              minHeight: 0,
            }}
          >
            {showSidebar && (
              <Sider style={{ background: colorBgContainer }} width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%" }}
                  items={siderItems}
                />
              </Sider>
            )}

            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
                overflowY: "auto",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>

        {/* Footer at bottom of page, not fixed */}
        <Footer
          style={{
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
            padding: "24px 48px",
            display: "flex",
            justifyContent: "center",
            gap: 40,
            fontWeight: 600,
          }}
        >
          <Link to="/about-us" style={{ color: "#000" }}>
            About Us
          </Link>
          <Link to="/contact-us" style={{ color: "#000" }}>
            Contact Us
          </Link>
          <Link to="/privacy-policy" style={{ color: "#000" }}>
            Privacy Policy
          </Link>
          <Link to="/shipping-policy" style={{ color: "#000" }}>
            Shipping Policy
          </Link>
        </Footer>

        {/* Modals */}
        <PhoneAuth visible={showPhoneAuth} onClose={() => setShowPhoneAuth(false)} />
        <UploadMedia open={showUpload} onClose={() => setShowUpload(false)} />
      </Layout>
    </>
  );
}

export default function App() {
  const [themeColors, setThemeColors] = useState({
    colorPrimary: "#b7a4a4",
    colorBgContainer: "#dfd5d5",
    colorText: "#433c3c",
    colorTextLightSolid: "#fff",
  });

  return (
    <ConfigProvider
      theme={{
        token: themeColors,
      }}
    >
      <Router>
        <AppContent themeColors={themeColors} setThemeColors={setThemeColors} />
      </Router>
    </ConfigProvider>
  );
}
