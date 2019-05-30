package com.gocart.gocart.Post.Post.Service;

import com.gocart.gocart.Event.Entity.Event;
import com.gocart.gocart.Event.Exception.EventNotExist;
import com.gocart.gocart.Event.Repository.EventRepository;
import com.gocart.gocart.Group.Entity.Group;
import com.gocart.gocart.Group.Exception.GroupNotExistException;
import com.gocart.gocart.Group.Repository.GroupRepository;
import com.gocart.gocart.Post.Comment.Service.CommentService;
import com.gocart.gocart.Post.Post.DTO.PostDTO;
import com.gocart.gocart.Post.Post.Entity.Post;
import com.gocart.gocart.Post.Post.Exception.PostNotExistException;
import com.gocart.gocart.Post.Post.Repository.PostRepository;
import com.gocart.gocart.User.DTO.ProfileDTO;
import com.gocart.gocart.User.Entity.User;
import com.gocart.gocart.User.Repository.UserRepository;
import com.gocart.gocart.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    CommentService commentService;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public PostDTO getPost(Long id) throws PostNotExistException {
        Optional<Post> optionalPost = postRepository.findById(id);

        if(optionalPost.isPresent()){
            return this.getPostDTOFromPost(optionalPost.get());
        }
        else{
            throw new PostNotExistException("Post not exist");
        }
    }

    @Override
    public PostDTO addPostToUser(String name, PostDTO postDTO) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            postDTO.setCreatorProfile(new ProfileDTO());
            Post post = this.getPostFromPostDto(postDTO);
            post.setCreator(user);
            post.setPostSource("użytkownik "+user.getFirstName() + " "+user.getLastName());
            postRepository.save(post);
            user.addPost(post);
            userRepository.save(user);
            return this.getPostDTOFromPost(post);
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public List<PostDTO> getMyPost(String name) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if(optionalUser.isPresent()){
            List<Post> postList = postRepository.findByUserAndSort(optionalUser.get().getUser_id());
            return this.getListPostDtoFromListPosts(postList);
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public List<PostDTO> getUserPosts(Long id) {
        List<Post> postList = postRepository.findByUserAndSort(id);

        return this.getListPostDtoFromListPosts(postList);

    }

    @Override
    public List<PostDTO> getAllFrontPagePosts(String name) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            List<Post> allPosts = new ArrayList<>();
            //TODO groups, events,

            //FRIENDS:
            List<Post> friendsPosts = new ArrayList<>();
            for(User friend : user.getFriends()) {
                friendsPosts.addAll(postRepository.findByUserAndSort(friend.getUser_id()));
            }

            //OWN POSTS:
            List<Post> myPosts = postRepository.findMyPostsAndSort(user.getUser_id());

            List<Post> groupPosts = new ArrayList<>();
            //GROUPS
            for(Group group : user.getGroups()) {
                groupPosts.addAll(postRepository.findByGroupAndSort(group.getGroup_id()));
            }

            allPosts.addAll(myPosts);
            allPosts.addAll(friendsPosts);
            allPosts.addAll(groupPosts);
            Comparator<Post> compareByDate = Comparator.comparing(Post::getDateTime);

            allPosts.sort(compareByDate);
            Collections.reverse(allPosts);

            return this.getListPostDtoFromListPosts(allPosts);
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public PostDTO addPostToGroup(Long id, PostDTO postDTO, String creator) throws GroupNotExistException {
        Optional<Group> optionalGroup = groupRepository.findById(id);
        Optional<User> optionalUser = userRepository.findByUsername(creator);

        if(optionalGroup.isPresent() && optionalUser.isPresent()){
            Group group = optionalGroup.get();
            User user = optionalUser.get();
            postDTO.setCreatorProfile(new ProfileDTO());
            Post post = this.getPostFromPostDto(postDTO);
            post.setPostSource("grupa "+group.getName());
            post.setCreator(user);
            postRepository.save(post);

            group.addPost(post);
            groupRepository.save(group);
            return this.getPostDTOFromPost(post);
        }
        else{
            throw new GroupNotExistException("group not exist");
        }
    }

    @Override
    public List<PostDTO> getGroupPosts(Long id) {
        List<Post> postList = postRepository.findByGroupAndSort(id);

        return this.getListPostDtoFromListPosts(postList);
    }

    private List<PostDTO> getListPostDtoFromListPosts(List<Post> posts) {
        List<PostDTO> postDTOS = new ArrayList<>();
        for(Post x : posts){
            postDTOS.add(this.getPostDTOFromPost(x));
        }
        return postDTOS;
    }

    private PostDTO getPostDTOFromPost(Post post){
        PostDTO postDTO = new PostDTO();
        postDTO.setTekst(post.getText());
        postDTO.setDateAndTime(this.getDateAndTimeFromLocalDateTime(post.getDateTime()));
        postDTO.setPost_id(post.getPost_id());
        postDTO.setCommentList(commentService.getCommentDtoListFromCommentList(post.getKomentarze()));
        postDTO.setCreatorProfile(userService.getProfileDtoFromUser(post.getCreator()));
        postDTO.setPostSource(post.getPostSource());
        return postDTO;
    }

    @Override
    public String getDateAndTimeFromLocalDateTime(LocalDateTime dateTime) {
        if(dateTime.getMinute()>9) {
            return dateTime.getDayOfMonth() + "-"
                    + dateTime.getMonth().getValue() + "-"
                    + dateTime.getYear() + "  "
                    + dateTime.getHour() + ":"
                    + dateTime.getMinute();
        }
        else {
            return dateTime.getDayOfMonth() + "-"
                    + dateTime.getMonth().getValue() + "-"
                    + dateTime.getYear() + "   "
                    + dateTime.getHour() + ":0"
                    + dateTime.getMinute();
        }
    }

    @Override
    public PostDTO addPostToEvent(Long id, PostDTO postDTO, String creator) throws EventNotExist {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        Optional<User> optionalUser = userRepository.findByUsername(creator);

        if(optionalEvent.isPresent() && optionalUser.isPresent()){
            Event event = optionalEvent.get();
            User user = optionalUser.get();
            postDTO.setCreatorProfile(new ProfileDTO());
            Post post = this.getPostFromPostDto(postDTO);
            post.setCreator(user);
            post.setPostSource("Wydarzenie "+event.getName());
            postRepository.save(post);

            event.addPost(post);
            eventRepository.save(event);
            return this.getPostDTOFromPost(post);
        }
        else{
            throw new EventNotExist("group not exist");
        }
    }

    @Override
    public List<PostDTO> getEventPosts(Long id) {
        List<Post> postList = postRepository.findByEventAndSort(id);

        return this.getListPostDtoFromListPosts(postList);
    }


    private Post getPostFromPostDto(PostDTO postDTO){
        Post post = new Post();
        post.setText(postDTO.getTekst());
        post.setDateTime(LocalDateTime.now());
        post.setKomentarze(new ArrayList<>());
        post.setPostSource(postDTO.getPostSource());
        post.setCreator(userService.getUserFromProfileDTO(postDTO.getCreatorProfile()));
        return post;
    }
}
