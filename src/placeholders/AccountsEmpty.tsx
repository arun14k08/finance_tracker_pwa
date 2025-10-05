import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Wallet2 } from 'lucide-react'
import React from 'react'

const AccountsEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Wallet2/>
        </EmptyMedia>
        <EmptyTitle>No Accounts Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any accounts yet. Get started by creating
          your first account.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default AccountsEmpty