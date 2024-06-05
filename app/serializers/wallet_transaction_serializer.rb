class WalletTransactionSerializer
  include JSONAPI::Serializer
  attributes :id, :amount, :transaction_type, :created_at

  attribute :created_at do |object|
    object.created_at.strftime('%Y-%m-%d')
  end


  attribute :user do |object|
    object.user.first_name
  end
end
