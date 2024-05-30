# app/controllers/concerns/loanable.rb
module Loanable
  extend ActiveSupport::Concern

  def check_state
    if @loan.state == "open"
      credit_debit
      calculate_interest
    elsif @loan.state == "closed"
      pay_loan
    end
  end


  def credit_debit
    return unless @loan.state == 'open'
    admin_wallet = find_admin_wallet
    user_wallet = current_user.wallet
    admin_wallet.debit(@loan.amount.to_f)
    user_wallet.credit(@loan.amount.to_f)
    user_wallet.save
    admin_wallet.save

    log_transaction(user_wallet, @loan.amount, 'credit', @loan)
    log_transaction(admin_wallet, -@loan.amount, 'debit', @loan)
  end

  def calculate_interest
    return unless @loan.state == 'open'
    @loan.total_loan_amount = (calculate_percentage(@loan.interest_rate, @loan.amount) + @loan.amount.to_f)
    @loan.save
  end

  def pay_loan
    return unless @loan.state == 'closed'
    admin_wallet = find_admin_wallet
    user_wallet = current_user.wallet
    user_wallet.debit(@loan.total_loan_amount.to_f)
    admin_wallet.credit(@loan.total_loan_amount.to_f)
    user_wallet.save
    admin_wallet.save

    log_transaction(user_wallet, -@loan.total_loan_amount.to_f, 'debit', @loan)
    log_transaction(admin_wallet, @loan.total_loan_amount.to_f, 'credit', @loan)
    @loan.update(paid: true)
  end

  def calculate_interest_amount(loan)
    return unless loan.state == 'open'
    calculate_percentage = calculate_percentage(loan.interest_rate.to_f, loan.amount.to_f)
    loan.total_loan_amount+= calculate_percentage
    loan.save
  end

  def add_log_transaction(wallet, amount, transaction_type, loan)
    log_transaction(wallet, amount, transaction_type, loan)
  end

  private

  def set_loan
    @loan = Loan.find(params[:id])
  end

  def calculate_percentage(part, whole)
    (part.to_f * whole.to_f) / 100
  end

  def find_admin_wallet
    User.find_by(admin: true).wallet
  end

  def log_transaction(wallet, amount, transaction_type, loan)
    WalletTransaction.create(
      user: wallet.user,
      amount: amount,
      transaction_type: transaction_type,
      loan: loan
    )
  end
end
