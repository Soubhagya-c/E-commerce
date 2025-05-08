package com.ecommerce.application.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.application.dao.ProductRepository;
import com.ecommerce.application.models.Product;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;

	public List<Product> getAllProducts(String query) {
		if (query != null && !query.isBlank()) {
			return productRepository.findByNameContainingIgnoreCaseOrBrandContainingIgnoreCase(query, query);
		} else {
			return productRepository.findAll();
		}
	}
	
	public Product getProductById(UUID id) {
		return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
	}
	
}
