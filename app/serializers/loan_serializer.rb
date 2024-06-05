class LoanSerializer
  include JSONAPI::Serializer
  attributes :amount, :interest_rate, :total_loan_amount, :state, :created

  attribute :paid do |object|
    object.paid? ? 'Yes' : 'No'
  end

  attribute :user do |object|
    object.user.first_name
  end

  attribute :created do |object|
    object.created_at.strftime('%Y-%m-%d')
  end
end
