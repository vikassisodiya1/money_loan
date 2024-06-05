class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :created_at, :admin
  attribute :wallet do |object|
    object&.wallet&.balance
  end
end
