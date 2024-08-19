app/(root)/my-banks/page.tsx
import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const MyBanks = () => {
const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  return (
    <><div>page</div><section className='flex'>
          <div className="my-banks">
              <HeaderBox
                  title="My Bank Accounts"
                  subtext="Effortlessly manage your banking activites." />

              <div className="space-y-4">
                  <h2 className="header-2">
                      Your cards
                  </h2>
                  <div className="flex flex-wrap gap-6">
                      {accounts && accounts.data.map((a: Account) => (
                          <BankCard
                              key={accounts.id}
                              account={a}
                              userName={loggedIn?.firstName} />
                      ))}
                  </div>
              </div>
          </div>
      </section></>
  )
}
export default MyBanks

 app/(root)/page.tsx
 import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
     })
  if(!accounts) return;
  
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  console.log({
    accountsData,
    account
  })

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        RECENT TRANSACTIONS
        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={accounts?.transactions}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
    app/(root)/payment-transfer/page.tsx
    import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Transfer = () => {
const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if(!accounts) return;

  const accountsData = accounts?.data;

  return (
    <><div>Transfer</div><section className="payment-transfer">
          <HeaderBox
              title="Payment Transfer"
              subtext="Please provide any specific details or notes related to the payment transfer" />

          <section className="size-full pt-5">
              <PaymentTransferForm accounts={accountsData} />
          </section>
      </section></>
  )
}