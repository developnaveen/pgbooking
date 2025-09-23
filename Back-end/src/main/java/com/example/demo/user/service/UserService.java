package com.example.demo.user.service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.user.dto.UserDTO;
import com.example.demo.user.model.User;
import com.example.demo.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) { this.userRepository = userRepository; }

    public UserDTO registerUser(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setContact(userDTO.getContact());
        user.setEmail(userDTO.getEmail());
        user.setDob(userDTO.getDob());
        user.setSex(userDTO.getSex());
        user.setOccupation(userDTO.getOccupation());
        user.setHomeAddress(userDTO.getHomeAddress());
        user.setAlternativeMobile(userDTO.getAlternativeMobile());
        user.setGovtIdType(userDTO.getGovtIdType());
        user.setGovtIdNumber(userDTO.getGovtIdNumber());
        user.setProfilePhoto(userDTO.getProfilePhoto());
        return new UserDTO(userRepository.save(user));
    }

    public UserDTO loginByMobile(String mobile) {
        return userRepository.findByContact(mobile)
                .map(UserDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with contact: " + mobile));
    }

    public UserDTO loginByEmail(String email) {
        return userRepository.findByEmail(email) // returns Optional<User>
                .map(UserDTO::new)              // maps User to UserDTO
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public UserDTO getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return new UserDTO(user);
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setDob(userDTO.getDob());
        user.setSex(userDTO.getSex());
        user.setOccupation(userDTO.getOccupation());
        user.setHomeAddress(userDTO.getHomeAddress());
        user.setAlternativeMobile(userDTO.getAlternativeMobile());
        user.setGovtIdType(userDTO.getGovtIdType());
        user.setGovtIdNumber(userDTO.getGovtIdNumber());
        user.setProfilePhoto(userDTO.getProfilePhoto());

        return new UserDTO(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserDTO::new).collect(Collectors.toList());
    }
}
