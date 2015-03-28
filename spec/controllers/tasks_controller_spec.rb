require 'rails_helper'

describe TasksController do
  describe 'create action' do
    # before(:each) do
    #   # @user = create(:user)
    #   @project = create(:project)
    #   @task_attributes = attributes_for(:task, :project_id => @project, :user_id => @user )
    # end

    it "renders task if it is saved" do
      post :create, {:project_id => @project.id}
      expect(response).to render(assigns(:task))
    end  

    it "renders error message if task isn't saved" do
      post :create, task: {name: nil}
      expect(response).to render(status: :error)
    end
  end
end


# @user = FactoryGirl.create(:user)
# @page = FactoryGirl.build(:page)
# @page.creator = @user
# @page.save
# @article = FactoryGirl.create(:article)
# @comment_attributes = FactoryGirl.attributes_for(:comment, :article_id => @article )



# it "renders the :index view" do
#   get :index, {:page_id => @page.id, :article_id => @article.id}
#   response.should render_template("index")
# end


# namespace :magazine do
#   resources :pages do
#     resources :articles do
#       resources :comments
#     end
#   end
# end

# # => /magazine/pages/:page_id/articles/:article_id/comments
# # => /projects/:project_id/tasks(.:format)


#  resources :projects do
#     resources :tasks
#   end