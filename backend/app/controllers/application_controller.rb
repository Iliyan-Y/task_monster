class ApplicationController < ActionController::API

  acts_as_token_authentication_handler_for User

  private
  
  def authenticate_user_from_token!
    user_email = request.headers["HTTP_EMAIL"].presence
    user = user_email && User.where(email: user_email).first

    if user && Devise.secure_compare(user.authentication_token,   request.headers["HTTP_AUTHENTICATION_TOKEN"])
      sign_in user, store: false
    else
      render_unauthorized("Unauthorized user or incorrect authentication token")
    end
  end

  def render_unauthorized(message)
    errors = { errors: [ { detail: message } ] }
    render json: errors, status: :unauthorized
  end
end
