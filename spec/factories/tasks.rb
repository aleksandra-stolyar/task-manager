FactoryGirl.define do
  factory :task do
    association(:project)
    name "name_of_task"
    deadline "11.19.2015"
    done true
  end  
end