using System;
using Application.Core;

namespace Application.Interfaces;

public interface IPageAssembler
{
    PageResponseDto<T> Assemble<T>(List<T> content, PageRequestDto pageRequestDto, int totalElements);
}
