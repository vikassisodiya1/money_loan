module Admin
  class HomeController < ApplicationController
    before_action :authenticate_user!

    def index
      @wallet = current_user.wallet
    end
    
    def loan_requests
      @loan_requests = Loan.all.requested
    end

    def loan_history
      @loans = Loan.all
      @transactions = WalletTransaction.all
    end
    
    private

    def ensure_admin
      unless current_user.admin?
        redirect_to root_path, alert: 'You are not authorized to access this page.'
      end
    end  
  end
end
