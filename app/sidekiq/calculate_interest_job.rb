class CalculateInterestJob
  include Loanable
  include Sidekiq::Job
  
  def perform
    loans = Loan.where(state: "open")
    loans.each do |loan|
      calculate_interest_amount(loan)
      puts 'Interest calculated'
    end
  end
end
