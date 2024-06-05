class LoanSerializer
  include JSONAPI::Serializer
  attributes :amount, :interest_rate, :total_loan_amount, :state

  attribute :paid do |object|
    object.paid? ? 'Yes' : 'No'
  end

  attribute :user do |object|
    object.user.first_name
  end
end
