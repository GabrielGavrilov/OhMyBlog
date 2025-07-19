package com.gabrielgavrilov.ohmyblog.core.blog.repository;

import com.gabrielgavrilov.ohmyblog.api.BlogSearchCriteriaDto;
import com.gabrielgavrilov.ohmyblog.core.blog.entity.Blog;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.util.HtmlUtils;

import java.util.Objects;
import java.util.stream.Stream;

@RequiredArgsConstructor
public class BlogSearchSpecification implements Specification<Blog> {

    private final BlogSearchCriteriaDto searchCriteriaDto;

    @Override
    public Specification<Blog> and(Specification<Blog> other) {
        return Specification.super.and(other);
    }

    @Override
    public Specification<Blog> or(Specification<Blog> other) {
        return Specification.super.or(other);
    }

    @Override
    public Predicate toPredicate(Root<Blog> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.and(Stream.of(
                filterByTitle(root, criteriaBuilder))
                .filter(Objects::nonNull)
                .toArray(Predicate[]::new)
        );
    }

    private Predicate filterByTitle(Root<Blog> root, CriteriaBuilder criteriaBuilder) {
        if (searchCriteriaDto.getTitle() == null ||  searchCriteriaDto.getTitle().isEmpty()) {
            return null;
        }
        return criteriaBuilder.like(root.get("title"), "%" + HtmlUtils.htmlEscape(searchCriteriaDto.getTitle()) + "%");
    }
}
