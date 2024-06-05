class LoanSerializer
  include JSONAPI::Serializer
  attributes :amount, :interest_rate, :total_loan_amount, :state

  attribute :paid do |object|
    object.paid? ? 'Yes' : 'No'
  end

  attribute :created_at do |object|
    object.created_at.strftime('%Y-%m-%d')
  end
end
