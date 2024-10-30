import Scrollbar from "../../components/Scrollbar";
import Suspense from "../../components/Suspense";
import { Outlet } from "react-router-dom";
import { RootWrapper, Sidebar } from "./index.tsx";
import NodeSidebarContent from "./NodeSidebarContent.tsx";

const ChatWindow = () => {
  return (
    <RootWrapper
      className="Mui-FixedWrapper"
      style={{
        width: "100%",
      }}
    >
      <Suspense>
        <Outlet />
      </Suspense>
      <Sidebar
        sx={{
          display: "inline-block",
        }}
      >
        <Scrollbar>
          <NodeSidebarContent />
        </Scrollbar>
      </Sidebar>
    </RootWrapper>
  );
};

export default ChatWindow;
