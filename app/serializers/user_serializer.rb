class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :created, :admin

  attribute :created do |object|
    object.created_at.strftime('%Y-%m-%d')
  end

  attribute :wallet do |object|
    object&.wallet&.balance
  end
end
