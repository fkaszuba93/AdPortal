package fk.adportal.service;

import fk.adportal.model.Category;
import fk.adportal.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Iterable<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(int id){
        Optional<Category> categoryInDb = categoryRepository.findById(id);
        if (categoryInDb.isEmpty()){
            throw new NoSuchElementException();
        }
        return categoryInDb.get();
    }
}
