class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: UserSerializer.new(current_user).serializable_hash, status: :ok
  end

  def profile
    render json: UserSerializer.new(current_user).serializable_hash, status: :ok
  end
end
