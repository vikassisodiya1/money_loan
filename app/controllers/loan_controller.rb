class LoanController < ApplicationController
  include Loanable
  before_action :authenticate_user!  # Ensure user is logged in
  before_action :set_loan, only: [:edit, :update]
  after_action :check_state, only: [:edit, :update]


  def index
      @loans = current_user.loans
      @transactions = current_user.wallet_transactions
  end

  def new
    @loan = Loan.new  
  end

  def create
    @user = current_user
    @loan = @user.loans.new(loan_params)
    @loan.user = current_user  # Assign loan to the current user
  
    if @loan.save
      redirect_to home_index_path(current_user), notice: "Loan request submitted successfully!"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @loan.update(loan_params)
      redirect_to home_index_path(current_user), notice: "Loan updated successfully!"
    else
      render :edit
    end
  end

  private

  def loan_params 
    params.require(:loan).permit(:amount, :state, :interest_rate)
  end
end
