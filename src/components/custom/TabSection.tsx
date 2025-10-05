import { TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Card } from "../ui/card";

const TabSection = (props : { activeTab: string }) => {
  const { activeTab } = props;

  return (
    <div className="w-full border-t border-gray-300 flex justify-evenly h-20 bg-gray-200">
      <TabsList className="w-full flex justify-evenly">
        <TabsTrigger value="transactions" className="w-full cursor-pointer">
          {
            activeTab === "transactions" ? <Card>Transactions</Card> : "Transactions"
          }
        </TabsTrigger>
        <TabsTrigger value="accounts" className="w-full cursor-pointer">
          {
            activeTab === "accounts" ? <Card>Accounts</Card> : "Accounts"
          }
        </TabsTrigger>
        <TabsTrigger value="profile" className="w-full cursor-pointer ">
          {
            activeTab === "profile" ? <Card>Profile</Card> : "Profile"
          }
        </TabsTrigger>
      </TabsList>
    </div>
  )
}

export default TabSection