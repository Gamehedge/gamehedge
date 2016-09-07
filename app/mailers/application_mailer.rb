class ApplicationMailer < ActionMailer::Base
  default from: "Gamehedge - Contact System <support@gamehedge.com>"
  layout 'mailer'
    
  def contact_message(_name, _email, _message)
        @name = _name
        @email = _email
        @message = _message
        mail(to: 'support@gamehedge.com', subject: "New message using the contact form of www.gamehedge.com from " + @email)
    end
end
