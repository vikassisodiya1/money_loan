class DebitUserWalletJob
  include Loanable
  include Sidekiq::Job

  def perform
    puts "DebitUserWalletJob"
    loans = Loan.where(state: "open")
    loans.each do |loan|
      user_wallet = loan.user.wallet
      admin_wallet = find_admin_wallet

      user_wallet_amount = user_wallet.balance.to_f
      total_loan_amount = loan.total_loan_amount.to_f
      if total_loan_amount > user_wallet_amount
        user_wallet.debit(user_wallet_amount)
        admin_wallet.credit(user_wallet_amount)

        add_log_transaction(user_wallet, -user_wallet_amount.to_f, 'debit', loan)
        add_log_transaction(admin_wallet, user_wallet_amount.to_f, 'credit', loan)
        loan.update(state: 'closed', paid: true)
        puts "DebitUserWallet success"
      end
    end
  end
end
