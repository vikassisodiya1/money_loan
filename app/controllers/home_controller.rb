class HomeController < ApplicationController

  def index
    # user = current_user&.admin?
    # case user
    # when true
    #   redirect_to admin_home_index_path
    # when false
    #   redirect_to user_dashboard_index_path
    # else
    #   redirect_to root_path
    # end
  end
end
