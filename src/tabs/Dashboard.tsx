import { mockTransactions } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Plus, Wallet, BarChart2, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const recent = mockTransactions.slice(0, 5)
  const income = recent.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0)
  const spend = recent.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0)

  // Build a simple series for post_balance across recent items
  const chartData = recent
    .map((t, i) => ({
      idx: recent.length - i,
      post: t.post_balance,
    }))
    .reverse()

  return (
    <main className="mx-auto w-full px-4 py-4 pb-24">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="gap-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <ArrowUpRight className="size-10 text-positive"/> Income (recent)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-positive ml-4">
              +{income.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        <Card className="gap-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <ArrowDownRight className="size-10 text-negative" /> Spend (recent)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-negative">
              -{spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Balance trend */}
      <Card className="mt-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-brand" />
            Balance trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              post: { label: "Post balance", color: "hsl(var(--chart-1))" },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="idx" hide />
                <YAxis width={36} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="post" stroke="var(--color-chart-1)" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Helpful sections */}
      <div className="mt-3 grid gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wallet className="h-4 w-4 text-brand" /> Quick actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Link to="/home/transactions">
              <Button variant="default" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add transaction
              </Button>
            </Link>
            <Link to="/home/accounts">
              <Button variant="outline" size="sm">
                Add account
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent transactions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {recent.map((t) => (
              <div key={t.id} className="flex items-center justify-between text-sm">
                <div className="text-pretty">{t.description}</div>
                <div className={t.type === "credit" ? "text-positive" : "text-negative"}>
                  {t.type === "credit" ? "+" : "-"}
                  {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
            <div className="pt-1">
              <Link to="/home/transactions">
                <Button variant="link" className="p-0">
                  View all
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
