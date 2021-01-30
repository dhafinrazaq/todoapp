require 'utils'
include ConstantsModule

class ApplicationController < ActionController::Base
  def encode_token(payload)
    JWT.encode(payload, CONSTANTS['jwt-secret'])
  end

  # get authorization token from cookie
  def auth_header_token
    cookies[CONSTANTS['authorization-cookie']]
  end
 
  # get user based on token
  def session_user
      decoded_hash = decoded_token
      if !decoded_hash.empty?
        user_id = decoded_hash[0]["user_id"]
        user = User.find_by :id => user_id
      end
  end
  
 def decoded_token
      if auth_header_token
         begin
           JWT.decode(auth_header_token, CONSTANTS['jwt-secret'], true, algorithm: 'HS256')
         rescue JWT::DecodeError
            []
          end
      else
        []
      end
 end
end
