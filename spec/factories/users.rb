FactoryGirl.define do
  factory :user do
    sequence(:email) { |i| "email#{i}@email.com" }
    password "password" 
  end  
end