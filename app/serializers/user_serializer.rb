class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :created_at, :admin

  attribute :created_at do |object|
    object.created_at.strftime('%Y-%m-%d')
  end

  attribute :wallet do |object|
    object&.wallet&.balance
  end
end
