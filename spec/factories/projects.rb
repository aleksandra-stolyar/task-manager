FactoryGirl.define do
  factory :project do
    association(:user)
    name "name"
  end  
end