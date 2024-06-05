module Admin
  class HomeController < ApplicationController
    before_action :authenticate_user!

    def index
      @wallet = current_user.wallet
    end
    
    def loan_requests
      @loan_requests = Loan.all.requested
      render json: LoanSerializer.new(@loan_requests).serializable_hash, status: :ok
    end

    def loan_history
      # @transactions = WalletTransaction.all
      @loans = Loan.all
      render json: LoanSerializer.new(@loans).serializable_hash, status: :ok
    end

    # def loan_history
    #   @transactions = WalletTransaction.all
    #   render json: LoanSerializer.new(@loans).serializable_hash, status: :ok
    # end
    
    private

    def ensure_admin
      unless current_user.admin?
        redirect_to root_path, alert: 'You are not authorized to access this page.'
      end
    end  
  end
end
